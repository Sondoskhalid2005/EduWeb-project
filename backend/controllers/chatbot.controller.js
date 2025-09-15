const { GoogleGenerativeAI } = require("@google/generative-ai");

// Import your database models
const Course = require("../dataModel/courses.model");
const Student = require("../dataModel/students.model");
const Instructor = require("../dataModel/instructors.model");
const Lesson = require("../dataModel/lessons.model");
const Enrollment = require("../dataModel/enrollements.model");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Define website-related keywords and topics
const WEBSITE_TOPICS = [
  'course', 'courses', 'class', 'classes', 'lesson', 'lessons',
  'instructor', 'teacher', 'student', 'enrollment', 'enroll',
  'learning', 'education', 'study', 'assignment', 'homework',
  'schedule', 'timetable', 'syllabus', 'curriculum', 'exam',
  'grade', 'score', 'certificate', 'completion', 'progress',
  'login', 'register', 'profile', 'account', 'dashboard',
  'notification', 'announcement', 'discussion', 'forum',
  'submission', 'task', 'project', 'quiz', 'test','enrollments',
  'enroll','my courses','my course','my class','my classes','my lessons',
  'my lesson'
];


// Function to check if the question is related to the website
const isWebsiteRelated = (message) => {
  const lowercaseMessage = message.toLowerCase();
  return WEBSITE_TOPICS.some(topic => 
    lowercaseMessage.includes(topic) || 
    lowercaseMessage.includes(topic + 's') || 
    lowercaseMessage.includes(topic.slice(0, -1)) // Handle plurals
  );
};


// Function to get relevant data from database based on the question
const getRelevantData = async (message) => {
  const lowercaseMessage = message.toLowerCase();
  let contextData = {};

  try {
    // Get courses data if question is about courses
    if (lowercaseMessage.includes('course') || lowercaseMessage.includes('class')) {
      contextData.courses = await Course.find({}).select('title description category price duration').limit(100);
    }

    // Get instructors data if question is about instructors/teachers
    if (lowercaseMessage.includes('instructor') || lowercaseMessage.includes('teacher')) {
      contextData.instructors = await Instructor.find({}).select('name expertise bio').limit(10);
    }

    // Get enrollment data if question is about enrollment
    if (lowercaseMessage.includes('enroll') || lowercaseMessage.includes('registration')) {
      contextData.enrollments = await Enrollment.find({})
        .populate('courseId', 'title')
        .populate('studentId', 'name')
        .limit(50);
    }

    // Get lessons data if question is about lessons
    if (lowercaseMessage.includes('lesson') || lowercaseMessage.includes('topic')) {
      contextData.lessons = await Lesson.find({}).select('title content duration').limit(50);
    }

    // Get students data if question is about students (be careful with sensitive data)
    if (lowercaseMessage.includes('student') && lowercaseMessage.includes('count')) {
      contextData.studentCount = await Student.countDocuments();
    }

  } catch (error) {
    console.error("Database query error:", error);
  }

  return contextData;
};

// Function to create context prompt for the AI
const createContextPrompt = (message, contextData) => {
  let prompt = `You are a helpful assistant for an online learning platform. Answer only questions related to our website and courses. Use the following data from our database to provide accurate information:

`;

  // Add database context
  if (contextData.courses && contextData.courses.length > 0) {
    prompt += "Available Courses:\n";
    contextData.courses.forEach(course => {
      prompt += `- ${course.title}: ${course.description} (Category: ${course.category}, Duration: ${course.duration})\n`;
    });
    prompt += "\n";
  }

  if (contextData.instructors && contextData.instructors.length > 0) {
    prompt += "Our Instructors:\n";
    contextData.instructors.forEach(instructor => {
      prompt += `- ${instructor.name}: ${instructor.expertise} - ${instructor.bio}\n`;
    });
    prompt += "\n";
  }

  if (contextData.lessons && contextData.lessons.length > 0) {
    prompt += "Sample Lessons:\n";
    contextData.lessons.forEach(lesson => {
      prompt += `- ${lesson.title} (Duration: ${lesson.duration})\n`;
    });
    prompt += "\n";
  }

  if (contextData.studentCount) {
    prompt += `Total Students Enrolled: ${contextData.studentCount}\n\n`;
  }

  prompt += `User Question: ${message}

Please provide a helpful response based on the information above. If the question is not related to our learning platform, courses, instructors, or educational services, politely redirect the user to ask questions about our platform.

Response:`;

  return prompt;
};

// Controller function
const askChatbot = async (req, res) => {
  const { message } = req.body;

  // Validate input
  if (!message || message.trim() === '') {
    return res.status(400).json({ error: "Message is required" });
  }

  try {
    // Check if the question is website-related
    if (!isWebsiteRelated(message)) {
      return res.json({
        reply: "I'm here to help with questions about our learning platform, courses, instructors, and educational services. Please ask me something related to our website!"
      });
    }

    // Get relevant data from database
    const contextData = await getRelevantData(message);

    // Create context-aware prompt
    const contextPrompt = createContextPrompt(message, contextData);

    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-flash",
      generationConfig: {
        maxOutputTokens: 500,
        temperature: 0.7,
      }
    });

    const result = await model.generateContent(contextPrompt);

    res.json({
      reply: result.response.text(),
    });

  } catch (error) {
    console.error("Chatbot Error:", error);
    res.status(500).json({ 
      error: "I'm having trouble processing your request. Please try again!" 
    });
  }
};


module.exports = { 
  askChatbot
};