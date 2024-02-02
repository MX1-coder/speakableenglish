const Admin  = require('../models/admin');
const Student = require('../models/student');
const Teacher = require('../models/teacher');
const Enquiry_Student = require('../models/enquiryStudent');
const User = require('../models/user');
const Meeting = require('../models/meeting');
const sendToken = require('../utils/sendToken');
const Courses = require('../models/courses');
const Feedback = require('../models/feedback');
const Booking = require('../models/booking');
const Payment  = require('../models/payment')
const Package = require('../models/packages')
const Accountant = require('../models/accountant');
const catchAsyncErrors = require('../middleware/catchAsyncError');
const ErrorHandler = require('../utils/ErrorHandler');
const moment = require('moment-timezone');
const crypto = require('crypto');
const SendSms = require('../utils/SendSms');
const { SendEmail } = require('../utils/SendEmail');
const Notification = require('../models/notifications')
const { NotificationHandler_Student, NotificationHandler_Accountant, NotificationHandler_Teacher } = require('../utils/NotificationHandler');
const axios  = require('axios')
exports.index = (req,res,next) => {
    res.render('index', { title: 'Express' });
};

exports.currentAdmin = catchAsyncErrors(async (req, res, next) => {
  const userType = await req.UserType;
  try {
    let user;
    if (userType === 'student') {
      user = await Student.findById(req.id).exec();
    } else if (userType === 'admin') {
      user = await Admin.findById(req.id).exec();
    } else if (userType === 'teacher') {
      user = await Teacher.findById(req.id).exec();
    } else if (userType === 'accountant') {
      user = await Accountant.findById(req.id).exec();
    }
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    res.status(200).json({ success: true, user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

exports.signout= async (req,res,next) =>{
  res.clearCookie("token");
  res.status(200).json({ message: "Successfully Logged Out!" });
};

// ---------------------------------------------------------------------------------------------------  Student controllers  -------------

// Router
exports.Signup_Student = async (req, res, next) => {
  try {
    const { Username, Password, Phone_Number, Email,recaptcha } = req.body;


    const existingUser = await Student.findOne({ Username });
    if (existingUser) {
      return res.status(409).json({ message: 'Student Username already exists' });
    }

    const recaptchaResponse = await axios.post(`https://www.google.com/recaptcha/api/siteverify?secret=${process.env.Recaptcha_Secret_key}&response=${recaptcha}`);
    const { success } = recaptchaResponse.data;

    if (!success) {
      return res.status(400).json({ message: 'reCAPTCHA verification failed' });
    }
     const formattedPhoneNumber = Phone_Number.replace(/[-\s]/g, '');
        const newStudent = new Student({
          Username,
          Password,
          Phone_Number: formattedPhoneNumber,
          Email,
        });
        await newStudent.save();
        const body = `Thank you! ${newStudent.Username} For Signing up at Speakable-English`;
        const number = newStudent.Phone_Number;
    // Handle error for SendSms
    try {
      await SendSms(body, number);
    } catch (smsError) {
      console.log('Error sending SMS:', smsError);
      // Continue execution even if SMS fails
    }

    // Handle error for SendEmail
    try {
      await SendEmail(newStudent.Email, newStudent.Username);
    } catch (emailError) {
      console.log('Error sending email:', emailError);
      // Continue execution even if email fails
    }

    const notificationbody = `Hii ${newStudent.Username}, You Have just Signup in Speakable_English with Email - ${newStudent.Email}`;
    const userid = newStudent._id
    // Handle error for NotificationHandler_Student
    try {
      NotificationHandler_Student(notificationbody,userid);
    } catch (notificationError) {
      console.log('Error creating notification:', notificationError);
      // Continue execution even if notification fails
    }

    sendToken(newStudent, res, 201);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error });
  }
};

exports.Signup_Student_By_Admin = async (req, res, next) => {
  try {
      const { Username, Password,Phone_Number, Email, Address,Profile_Image  } = req.body;
      // Check if the username already exists
      const existingUser = await Student.findOne({ Username });
      if (existingUser) {
        return res.status(409).json({ message: 'Student Username already exists' });
      }
      // Create a new Student instance
      const newStudent = new Student({
        Username,
        Email,
        Password,
        Phone_Number,
        Profile_Image,
        Address,
      });
      // Save the new Student to the database
      await newStudent.save();
      res.status(200).json({newStudent})
      // Generate a JWT token for the newly registered user
    } catch (error) {
      res.status(500).json({ message: 'Internal server error',error });
    }
};

exports.Signin_Student = async (req, res, next) => {
  try {
      const { Username, Password } = req.body;
      // Check if the username exists
      const student = await Student.findOne({ Username });
      if (!student) {
        return res.status(401).json({ message: `Authentication failed Student Username didn't exists` });
      }
      // Compare the entered password with the stored hashed password
      const passwordMatch = await Student.comparePassword(Password, student.Password);
      if (passwordMatch) {
        sendToken(student, res, 201);
      } else {
        res.status(401).json({ message: `Authentication failed Student Password didn't exists` });
      }
    } catch (error) {
      res.status(500).json({ message: 'Internal server error',error });
    }
};

exports.Delete_Student = async (req,res,next) => {
  try {
    const student_ID = req.params.student_ID
    if (!student_ID) {
      return res.status(400).json({ error: 'Invalid student ID provided' });
    }
    await Student.findByIdAndDelete(student_ID)
    res.json({ message: 'Student deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.Update_Student =  async (req, res, next) => {
  try {
    const Student_ID = req.params.StudentID;
    // Find the student
    const getStudent = await Student.findById({ _id: Student_ID });
    if (!getStudent) {
      return res.status(404).json({ message: 'Student not found! Student_ID is not valid!' });
    }
    Object.assign(getStudent, req.body);
    const updatedData = await getStudent.save();
    res.json({ message: 'Student data updated successfully', updatedData });
  } catch (error) {
    next(error);
  }
};

exports.FetchAll_Students = async (req,res,next) => {
  try {
    const studentslist =  await Student.find()
    res.json({ message: 'Students fetch  successfully' ,studentslist});
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.StudentDetails = async (req,res,next) => {
  try {
    const StudentID = req.params.StudentID
    const StudentDetails =  await Student.findById({_id:StudentID}).populate('Courses_assign')
    res.json({ message: 'Student Details fetch  successfully' , StudentDetails });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// ---------------------------------------------------------------------------------------------------  Teacher controllers  -------------
  
exports.Signup_Teacher = async (req, res, next) => {
  try {
    // console.log(req.body);
    const {
      Username,
      Password,
      Phone_Number,
      Address,
      Description,
      Short_Title,
      Purchase_Price,
      Availability_Date,
      Courses_assign,
      SocialLinks,
      Email
    } = req.body;
    // Check if the username already exists
    const existingTeacher = await Teacher.findOne({ Username });
    if (existingTeacher) {
      return res.status(409).json({ message: 'Teacher Username already exists' });
    }
    // Create a new Teacher instance
    const newTeacher = new Teacher({
      Username,
      Password,
      Phone_Number,
      Address,
      Description,
      Short_Title,
      Purchase_Price,
      Courses_assign,
      Email,
      Profile_Image: [req.body.media], // Assuming media is a valid property in req.body
      Availability: Availability_Date.map((availability) => ({
        Date: availability.Date,
        Time: availability.Time.map((time) => {
          const utcStart = moment.utc(time.Start_time, 'HH:mm');
          const istStart = utcStart.tz('Asia/Kolkata');
          const utcEnd = moment.utc(time.End_time, 'HH:mm');
          const istEnd = utcEnd.tz('Asia/Kolkata');

          return {
            Start_time: istStart.toDate(),
            End_time: istEnd.toDate(),
          };
        }),
      })),
      SocialLinks,
    });
    // Save the new Teacher to the database
    await newTeacher.save();
    // console.log(newTeacher);
    const teacherID = newTeacher._id;
    // Iterate over Courses_assign and update Courses
    for (const courseid of newTeacher.Courses_assign) {
      const course = await Courses.findById(courseid);
      if (course) {
        course.Teachers_Details.push(teacherID);
        await course.save();
        // console.log(course);
      }
    }
    sendToken(newTeacher, res, 201);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Internal server error',
      error,
    });
  }
};

exports.Signup_Teacher_By_Admin = async (req, res, next) => {
  try {
    const {
      Username,
      Password,
      Phone_Number,
      Address,
      Description,
      Short_Title,
      Purchase_Price,
      Availability_Date,
      Courses_assign,
      SocialLinks,
      Profile_Image,
      Email,
    } = req.body;

    const existingTeacher = await Teacher.findOne({ Username });
    if (existingTeacher) {
      return res.status(409).json({ message: 'Teacher Username already exists' });
    }

    // Create a new Teacher instance
    const newTeacher = new Teacher({
      Username,
      Password,
      Phone_Number,
      Address,
      Description,
      Short_Title,
      Purchase_Price,
      Courses_assign,
      Email,
      Profile_Image,
      SocialLinks,
    });

    // Iterate over Availability_Date and map to backend Availability
    newTeacher.Availability = Availability_Date.map((availability) => {
      const { Date, Time } = availability;
    
      // Find all dates between Start_Date and End_Date
      const dates = [];
      let currentDate = moment(Date.Start_Date)
      const endDate = moment(Date.End_Date);
    
      while (currentDate <= endDate) {
          dates.push(currentDate.format('YYYY-MM-DD'));
          currentDate.add(1, 'days');
      }
      // Map over frontend Time and create backend Time array
      return {
        Dates: dates,
        Time: Time,
      };
    });
    
    console.log(newTeacher)
    // Save the new Teacher to the database
    await newTeacher.save();

    const teacherID = newTeacher._id;

    // Iterate over Courses_assign and update Courses
    for (const courseId of newTeacher.Courses_assign) {
      const course = await Courses.findById(courseId);
      if (course) {
        course.Teachers_Details.push(teacherID);
        await course.save();
      }
    }

    const notificationbody = `Hii ${newTeacher.Username}, You Have just Added as a Teacher in Speakable_English with Email - ${newTeacher.Email}`;
    const userid = newTeacher._id
    // Handle error for NotificationHandler_Student
    try {
      NotificationHandler_Teacher(notificationbody,userid);
    } catch (notificationError) {
      console.log('Error creating notification:', notificationError);
      // Continue execution even if notification fails
    }
    res.status(200).json({ newTeacher });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Internal server error',
      error,
    });
  }
};


exports.Signin_Teacher = async (req, res, next) => {
  try {
      const { Username, Password } = req.body;
      // Check if the username exists
      const teacher = await Teacher.findOne({ Username });
      if (!teacher) {
        return res.status(401).json({ message: `Authentication failed Teacher Username didn't exists` });
      }
      // Compare the entered password with the stored hashed password
      const passwordMatch = await Teacher.comparePassword(Password, teacher.Password);
      if (passwordMatch) {
      // Generate a JWT token for the authenticated user
        sendToken(teacher, res, 201);
      } else {
        res.status(401).json({ message: `Authentication failed Teacher Password didn't exists` });
      }
    } catch (error) {
      res.status(500).json({ message: 'Internal server error',error });
    }
};

exports.Delete_Teacher = async (req,res,next) => {
  try {
    const teacher_ID = req.params.teacher_ID
    if (!teacher_ID) {
      return res.status(400).json({ error: 'Invalid teacher ID provided' });
    }
    await Teacher.findByIdAndDelete(teacher_ID)
    res.json({ message: 'Teacher deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


const updateTeacher = async (req, res, next) => {
  try {
    const teacherId = req.params.TeacherID;
    const teacher = await Teacher.findById(teacherId);

    if (!teacher) {
      return res.status(404).json({ message: 'Teacher not found!' });
    }

    // Update courses assigned to the teacher
    await updateCoursesAssign(teacher, req.body.Courses_assign);
    // Update teacher data
    Object.assign(teacher, req.body);
    const updatedData = await teacher.save();

    res.json({ message: 'Teacher data updated successfully', updatedData });
  } catch (error) {
    console.error('Error updating teacher:', error);
    next(error);
  }
};

const updateCoursesAssign = async (teacher, coursesAssign) => {
  if (coursesAssign && coursesAssign.length > 0) {
    // Update courses assigned to the teacher
    const coursePromises = coursesAssign.map(async (courseId) => {
      try {
        const course = await Courses.findById(courseId);
        if (course) {
          course.Teachers_Details.push(teacher._id);
          await course.save();
        }
      } catch (error) {
        console.error(`Error updating course ${courseId}:`, error);
      }
    });

    await Promise.all(coursePromises);
  }
};

// Usage in the router/controller
exports.Update_Teacher = updateTeacher;




const updateTeacherByAvailability = async (req, res, next) => {
  try {
    const teacherId = req.params.TeacherID;
    const teacher = await Teacher.findById(teacherId);

    if (!teacher) {
      return res.status(404).json({ message: 'Teacher not found!' });
    }

    // Update courses assigned to the teacher
    await updateCoursesAssign(teacher, req.body.Courses_assign);

    // Update teacher availability based on the provided data
    const newAvailability = req.body.Availability_Date.map((availability) => {
      const { Date, Time } = availability;

      // Find all dates between Start_Date and End_Date
      const dates = [];
      let currentDate = moment(Date.Start_Date);
      const endDate = moment(Date.End_Date);

      while (currentDate <= endDate) {
        dates.push(currentDate.format('YYYY-MM-DD'));
        currentDate.add(1, 'days');
      }

      // Map over frontend Time and create backend Time array
      return {
        Dates: dates,
        Time: Time,
      };
    });
    const updatedAvailability = [...newAvailability];
    const updatedData = await Teacher.findByIdAndUpdate(
      teacherId,
      {
        Username: req.body.Username,
        Password: req.body.Password,
        Phone_Number:req.body.Phone_Number,
        Address:req.body.Address,
        Description:req.body.Description,
        Short_Title:req.body.Short_Title,
        Purchase_Price:req.body.Purchase_Price,
        Courses_assign:req.body.Courses_assign,
        Email:req.body.Email,
        Profile_Image:req.body.Profile_Image,
        SocialLinks:req.body.SocialLinks,
        Availability: updatedAvailability,
      },
    );

    res.json({ message: 'Teacher data updated successfully', updatedData });
  } catch (error) {
    console.error('Error updating teacher:', error);
    next(error);
  }
};

exports.Update_Teacher_By_Availability = updateTeacherByAvailability;


exports.Fetch5Teachers = async (req,res,next) => {
  try {
    const teacherslist =  await Teacher.find().limit(4)
    res.json({ message: '5 Teachers fetch  successfully' , teacherslist});
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.TeacherDetails = async (req,res,next) => {
  try {
    const TeacherID = req.params.TeacherID
    const teachersDetails =  await Teacher.findById({_id:TeacherID}).populate('Courses_assign')
    res.json({ message: 'Teacher Details fetch  successfully' , teachersDetails });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.Fetch1teacher = async (req,res,next) => {
  try {
    const TeacherDetails =  await Teacher.find().limit(1)
    res.json({ message: '1 Teacher fetch  successfully' , TeacherDetails});
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getteachers = async (req, res) => {
  try {
    const teachers = await Teacher.find().populate('Courses_assign');
    res.json(teachers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// ----------------------------------------------------------------------------------------------------  Admin controllers  ---------------

exports.Signup_admin = async (req, res, next) => {
  try {
      const { Username,Email, Password } = req.body;
      // Check if the username already exists
      const existingUser = await Admin.findOne({ Username });
      if (existingUser) {
        return res.status(409).json({ message: 'admin Username already exists' });
      }
      // Create a new admin instance
      const newadmin = new Admin({
        Username,
        Email,
        Password,
      });
      // Save the new admin to the database
      await newadmin.save();
      // Generate a JWT token for the newly registered user
      sendToken(newadmin, res, 201);
    } catch (error) {
      res.status(500).json({ message: 'Internal server error',error });
    }
};
  
exports.Signin_admin = async (req, res, next) => {
  try {
      const { Username, Password } = req.body;
      // Check if the username exists
      const admin = await Admin.findOne({ Username });
      if (!admin) {
        return res.status(401).json({ message: `Authentication failed admin Username didn't exists` });
      }
      // Compare the entered password with the stored hashed password
      const passwordMatch = await Admin.comparePassword(Password, admin.Password);
      if (passwordMatch) {
      // Generate a JWT token for the authenticated user
       sendToken(admin, res, 201);
      } else {
        res.status(401).json({ message: `Authentication failed admin Password didn't exists` });
      }
    } catch (error) {
      res.status(500).json({ message: 'Internal server error',error });
    }
};

// -----------------------------------------------------------------------------------------------------  User controllers  ----------------

exports.Signup_user = catchAsyncErrors(async (req, res, next) => {
  try {
    const { Username, Password, } = req.body;
    // Check if the username already exists in any user type
    const existingUser = await Student.findOne({ Username }) || await Admin.findOne({ Username }) || await Teacher.findOne({ Username });
    if (existingUser) {
      return res.status(409).json({ message: 'User Username already exists' });
    }
    // Determine the user type based on the request route
    const userType = req.route.path.includes('student') ? 'student' :
                     req.route.path.includes('admin') ? 'admin' :
                     req.route.path.includes('teacher') ? 'teacher' :
                     null;
    if (!userType) {
      return res.status(500).json({ message: 'Internal server error. Invalid user type.' });
    }
    // Create a new user instance based on the determined user type
    let newUser;
    if (userType === 'student') {
      newUser = new Student({
        Username,
        Email,
        Password,
        Phone_Number,
        Address,
      });
    } else if (userType === 'admin') {
      newUser = new Admin({
        Username,
        Email,
        Password,
      });
    } else if (userType === 'teacher') {
      newUser = new Teacher({
        Username,
        Email,
        Password,
        Phone_Number,
        Address,
      });
    }
    // Save the new user to the database
    await newUser.save();
    // Generate a JWT token for the newly registered user
    sendToken(newUser, res, 201);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error', error });
  }
});
  
exports.Signin_user = catchAsyncErrors(async (req, res, next) => {
  try {
    const { Username, Password } = req.body;
    // Check if the username exists in any user type
    const user = await Student.findOne({ Username }) || await Admin.findOne({ Username }) || await Teacher.findOne({ Username })  || await Accountant.findOne({ Username });
    if (!user) {
      return res.status(401).json({ message: 'Authentication failed. User not found.' });
    }
    // Compare the entered password with the stored hashed password
    const passwordMatch = await user.constructor.comparePassword(Password, user.Password);
    if (passwordMatch) {
      // Generate a JWT token for the authenticated user
      sendToken(user, res, 201);
    } else {
      res.status(401).json({ message: 'Authentication failed. Incorrect password.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error', error });
  }
});

// -----------------------------------------------------------------------------------------------------  Enquiry controllers  -------------

// 1. Create API
exports.Create_Enquiry_Student = async (req, res, next) => {
    try {
      const StudentID = req.params.StudentID;
      let student = await Student.findOne({ _id: StudentID });
      const newEnquiryStudent = new Enquiry_Student(req.body);
      const result = await newEnquiryStudent.save();
    
      res.status(201).json({ enquiry }); 
    } catch (error) {
      next(error);
    }
};

exports.Create_Enquiry = async (req, res, next) => {
  try {
    const { Name , Email , Message } = req.body;
    // console.log(Name,Email,Message)
    const newEnquiry = new Enquiry_Student({
      Name:Name,
      Email:Email,
      Message:Message
    });
    const result = await newEnquiry.save();
    // console.log(result)
    // Save the updated student document
    res.status(201).json({ message:"Enquiry Added Successfully", result }); 
  } catch (error) {
    next(error);
  }
};

// 2. Fetch API
exports.Fetch_Enquiry_Student =  async (req, res, next) => {
    try {
          const Email = req.params.Email;
          // Find the student
          const Enquiry = await Enquiry_Student.find({ Email: Email }).populate('Student_ID');
          if (!Enquiry) {
            return res.status(404).json({ message: 'Enquiry not found!' });
          }
          res.status(200).json({ Enquiry });
    } catch (error) {
      next(error);
    }
};
 
// 3. Delete API
exports.Delete_Enquiry_Student =  async (req, res, next) => {
    try {
      const Enquiry_ID = req.params.EnquiryID
      // Find the student
      await Enquiry_Student.findByIdAndDelete(Enquiry_ID);
      res.json({ message: 'Enquiry student deleted successfully' });
    } catch (error) {
      next(error);
    }
};
  
// 4. Update API
exports.Update_Enquiry_Student =  async (req, res, next) => {
    try {
      const Student_ID = req.params.StudentID;
      const Enquiry_ID = req.params.EnquiryID;
      // Find the student
      const studentResult = await Student.findById({ _id: Student_ID });
      if (!studentResult) {
        return res.status(404).json({ message: 'Student not found! Student_ID is not valid!' });
      }
      // Find the Enquiry_Student
      const enquiryResult = await Enquiry_Student.findById({ _id: Enquiry_ID });
      if (!enquiryResult) {
        return res.status(404).json({ message: 'Enquiry not found! Enquiry_ID is not valid!' });
      }
      // Update Enquiry_Student properties based on req.body
      Object.assign(enquiryResult, req.body);
      // Save the updated Enquiry_Student
      const updatedEnquiry = await enquiryResult.save();
      res.json({ message: 'Enquiry student updated successfully', updatedEnquiry });
    } catch (error) {
      next(error);
    }
};

// -----------------------------------------------------------------------------------------------------  Meeting controllers  --------------

exports.Create_Meeting =  async (req, res) => {
  try {
    const CreatedBy_ID = req.body.CreatedBy_ID;
    const Teacher_ID  = req.body.Teacher_ID;
    const Status = req.body.Status
    const Atande_IDs = [ CreatedBy_ID ]; // Start with createdBy as an attendee
    if (!Atande_IDs) {
      return res.status(400).json({ error: 'Incomplete data provided error in creating the CreatedBy_ID' });
    }
    // Check if the provided IDs exist in any of the collections (teacher, admin, student, and user)
    const Atande_IDsExist = await Promise.all(
      Atande_IDs.map(async (id) => {
        const user = await User.findById(id);
        const teacher = await Teacher.findById(id);
        const admin = await Admin.findById(id);
        const student = await Student.findById(id);

        return user || teacher || admin || student;
      })
    );

    const createdByExists = await Promise.all(
      Atande_IDs.map(async (id) => {
        const user = await User.findById(id);
        const teacher = await Teacher.findById(id);
        const admin = await Admin.findById(id);
        const student = await Student.findById(id);

        return user || teacher || admin || student;
      })
    );

    if (!Atande_IDsExist.every((exists) => exists) || !createdByExists) {
      return res.status(400).json({ error: 'Invalid attendee or createdBy ID provided' });
    }

    const zoomMeetingLink = `https://us05web.zoom.us/j/89898542212?pwd=jg0vQ8t61dNkvkorRoqrug6TJcsTJD.1`;

    // Create the meeting
    const meeting = new Meeting({
      Atande_ID: Atande_IDs,
      Teacher_ID:Teacher_ID,
      Joining_Url: zoomMeetingLink,
      Status: Status, // You can customize the status as needed
      Created_By: CreatedBy_ID,
    });
    // Save the meeting to the database
    await meeting.save();
    // Send a success response with the Zoom meeting link
    res.status(201).json({ message: 'Meeting created successfully', meeting, zoomMeetingLink });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.Join_Meeting = async (req, res) => {
  try {
    const meetingId = req.params.meetingId;
    const userId = req.params.userId;
    // Validate the data
    if (!meetingId || !userId) {
      return res.status(400).json({ error: 'Incomplete data provided' });
    }
    // Check if the provided IDs exist in any of the collections (teacher, admin, student, and user)
    const user = await User.findById(userId);
    const teacher = await Teacher.findById(userId);
    const admin = await Admin.findById(userId);
    const student = await Student.findById(userId);

    if (!(user || teacher || admin || student)) {
      return res.status(400).json({ error: 'Invalid user ID provided' });
    }
    // Find the meeting based on the provided meeting ID
    const meeting = await Meeting.findById(meetingId);

    if (!meeting) {
      return res.status(400).json({ error: 'Invalid meeting ID provided' });
    }
    // Update the Atande_ID field
    meeting.Atande_ID.push(userId);
    // Check if the user is a teacher
    if (teacher) {
      meeting.teacher_ID.push(userId);
    }
    // Save the updated meeting to the database
    await meeting.save();
    // Redirect the user to the Zoom meeting link
    // res.redirect(meeting.Joining_Url);
    res.status(200).json({ message: 'User joined the meeting successfully', meeting });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.Delete_Meeting = async (req,res,next) => {
  try {
    const meeting_ID = req.params.meeting_ID
    if (!meeting_ID) {
      return res.status(400).json({ error: 'Invalid meeting ID provided' });
    }
    const deletedmeeting =  await Meeting.findByIdAndDelete(meeting_ID)
    res.json({ message: 'Meeting deleted successfully' , deletedmeeting});
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.Update_Meeting =  async (req, res, next) => {
  try {
    const Meeting_ID = req.params.MeetingID;
    // Find the meeting
    const getMeeting = await Meeting.findById({ _id: Meeting_ID });
    if (!getMeeting) {
      return res.status(404).json({ message: 'Meeting not found! Meeting_ID is not valid!' });
    }
    Object.assign(getMeeting, req.body);
    const updatedData = await getMeeting.save();
    res.json({ message: 'Meeting data updated successfully', updatedData });
  } catch (error) {
    next(error);
  }
};

exports.getmeetings = async (req, res) => {
  try {
    const meetings = await Meeting.find();
    res.json(meetings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// ----------------------------------------------------------------------------------------------------- Course controllers ------------------

exports.Create_Course = async (req, res) => {
  const { Course_Name, Description, Teachers_Details, Purchase_Price, Course_Images } = req.body;
  try {
    // Check if the course already exists
    const existingCourse = await Courses.findOne({ Course_Name });
    if (existingCourse) {
      return res.status(409).json({ message: 'Course already exists' });
    }
    // Create a new Course
    const newCourse = new Courses({
      Course_Name,
      Description,
      Teachers_Details,
      Purchase_Price,
      Course_Images,
    });
    // Save the new Course to the database
    const savedCourse = await newCourse.save();
    // Update Courses_assign in the assigned teachers
    for (const assignedTeacherId of Teachers_Details) {
      const assignedTeacher = await Teacher.findById(assignedTeacherId);
      if (assignedTeacher) {
        assignedTeacher.Courses_assign.push(savedCourse._id);
        await assignedTeacher.save();
      }
    }
    res.status(201).json({ message: 'Course created successfully', newCourse: savedCourse });
  } catch (error) {
    console.error('Error creating course:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.Delete_Course = async (req, res, next) => {
  try {
    const CourseID = req.params.CourseID;
    if (!CourseID) {
      return res.status(400).json({ error: 'Invalid course ID provided' });
    }
    // Find the course before deleting
    const deletedCourse = await Courses.findById(CourseID);
    // Remove CourseID from Courses_assign in the associated teachers
    const teacherIDsInCourse = (deletedCourse.Teachers_Details || []).map(td => td._id.toString());
    await Promise.all(teacherIDsInCourse.map(async (teacherId) => {
      try {
        const teacher = await Teacher.findById(teacherId);
        if (teacher) {
          // Remove CourseID from Courses_assign in the teacher
          teacher.Courses_assign = (teacher.Courses_assign || []).filter(courseId => courseId.toString() !== CourseID);
          await teacher.save();
        }
      } catch (teacherError) {
        console.error('Error updating teacher details:', teacherError);
        // Handle specific error scenarios, you might want to log it or take appropriate action
      }
    }));
    // Delete the course
    await Courses.findByIdAndDelete(CourseID);
    res.json({ message: 'Course deleted successfully' });
  } catch (error) {
    console.error('Error deleting course:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.Update_Course = async (req, res, next) => {
  try {
    const CourseID = req.params.CourseID;
    // Find the course
    const getCourse = await Courses.findById(CourseID);
    // console.log(getCourse)
    if (!getCourse) {
      return res.status(404).json({ message: 'Course not found! Course_ID is not valid!' });
    }
    // Capture the original teacher details
    const originalTeacherDetails = getCourse.Teachers_Details || [];
    // Update course data
    Object.assign(getCourse, req.body);
    const updatedData = await getCourse.save();
    // Update teacher details
    // console.log(updatedData)
    const updatedTeacherDetails = updatedData.Teachers_Details || [];
    // Identify removed teachers
    const removedTeachers = originalTeacherDetails.filter(
      (originalTeacher) => !updatedTeacherDetails.some((updatedTeacher) => updatedTeacher._id.equals(originalTeacher._id))
    );
    // Remove CourseID from Courses_assign in removed teachers
    await Promise.all(removedTeachers.map(async (removedTeacher) => {
      try {
        const teacher = await Teacher.findById(removedTeacher._id);
        if (teacher) {
          // Remove CourseID from Courses_assign in the teacher
          teacher.Courses_assign = (teacher.Courses_assign || []).filter(courseId => courseId.toString() !== CourseID);
          await teacher.save();
        }
      } catch (teacherError) {
        console.error('Error updating teacher details:', teacherError);
        // Handle specific error scenarios, you might want to log it or take appropriate action
      }
    }));
    // Update Courses_assign in current teachers
    await Promise.all(updatedTeacherDetails.map(async (teacherDetails) => {
      try {
        const teacher = await Teacher.findById(teacherDetails._id);
        if (teacher) {
          // Update Courses_assign in the teacher
          teacher.Courses_assign.push(CourseID);
          await teacher.save();
        }
      } catch (teacherError) {
        console.error('Error updating teacher details:', teacherError);
        // Handle specific error scenarios, you might want to log it or take appropriate action
      }
    }));

    res.json({ message: 'Course data updated successfully', updatedData });
  } catch (error) {
    console.error('Error updating course:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.courseDetails = async (req,res,next) => {
  try {
    const CourseID = req.params.CourseID
    const CoursesDetails =  await Courses.findById({_id:CourseID}).populate('Teachers_Details').exec()
    res.json({ message: 'Courses Details fetch  successfully' , CoursesDetails });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.Fetch5courses = async (req,res,next) => {
  try {
    const courseslist =  await Courses.find().limit(5)
    res.json({ message: '5 Courses fetch  successfully' , courseslist});
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// -------------------------------------------------------------------------------------------------------Feedback Controllers -------------------------------

exports.Add_Feedback =  async (req, res) => {
  try {
      const { Message, Student_ID,Teachers_ID, Rating,Booking_ID } = req.body;
      const newFeedback = new Feedback({
        Message, 
        Student_ID,
        Teachers_ID, 
        Rating,
        Booking_ID 
      });
      // Save the new feedback to the database
      await newFeedback.save();
      res.status(201).json({ message: 'Feedback added successfully', newCourse });
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
  }
};

exports.Delete_Feedback = async (req,res,next) => {
  try {
    const FeedbackID = req.params.FeedbackID
    if (!FeedbackID) {
      return res.status(400).json({ error: 'Invalid feedback ID provided' });
    }
    await Feedback.findByIdAndDelete(FeedbackID)
    res.json({ message: 'Feedback deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.Update_Feedback =  async (req, res, next) => {
  try {
    const FeedbackID = req.params.FeedbackID;
    // Find the feedback
    const feedbackResult = await Feedback.findById({ _id: FeedbackID });
    if (!feedbackResult) {
      return res.status(404).json({ message: 'Feedback not found! Feedback_ID is not valid!' });
    }
    // Update Feedback properties based on req.body
    Object.assign(req.body);
    // Save the updated Feedback
    const updatedFeedback = await feedbackResult.save();
    res.json({ message: 'Feedback updated successfully', updatedFeedback });
  } catch (error) {
    next(error);
  }
};

// ----------------------------------------------------------------------------------------------------- Booking controllers ------------------

exports.Create_Booking = async (req, res) => {
  try {
    const {
      Note_for_teacher,
      Student_ID,
      Teacher_ID,
      Package_ID,
      Status,
      Meeting_ID,
      Scheduled_Date,
      Time_Slot,
    } = req.body;

    // Parse Scheduled_Date into a Date object

    // Parse Time_Slot into Start_time and End_time
    const [Start_time, End_time ] = Time_Slot.split('-');

    // Create a booking
    const newBooking = new Booking({
      Note_for_teacher,
      Student_ID,
      Teacher_ID,
      Package_ID,
      Status,
      Meeting_ID,
      Scheduled_Date,
      Time_Slot: { Start_time, End_time },
    });

    // Save the new booking to the database
    await newBooking.save();
    res.status(201).json({ message: 'Booking created successfully', newBooking });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.Delete_Booking = async (req,res,next) => {
  try {
    const BookingID = req.params.BookingID
    if (!BookingID) {
      return res.status(400).json({ error: 'Invalid booking ID provided' });
    }
    const deletedBooking = await Booking.findByIdAndDelete(BookingID)
    res.json({ message: 'Booking deleted successfully', deletedBooking });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.Update_Booking = async (req, res, next) => {
  try {
    const { status } = req.body;
    // Check if Status is provided
    if (!status) {
      return res.status(400).json({ error: 'Status is required for updating booking' });
    }
    // Update the Status in the database
    const updatedBooking = await Booking.findByIdAndUpdate(
      req.params.BookingID, // Replace 'bookingId' with the actual parameter name for booking ID
      { Status:status },
      { new: true } // To get the updated document as a result
    );
    // Check if the booking exists
    if (!updatedBooking) {
      return res.status(404).json({ error: 'Booking not found' });
    }
    res.status(200).json({ message: 'Booking updated successfully', updatedBooking });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

// ----------------------------------------------------------------------------------------------------- Get controllers ----------------------

exports.getstudentbyID = async (req, res) => {
  try {
    const StudentID = req.params.StudentID
    const student = await Student.findOne({_id :StudentID});
    res.json(student);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.getenquiries = async (req, res) => {
  try {
    const enquiries = await Enquiry_Student.find();
    res.json(enquiries);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.getcourses = async (req, res) => {
  try {
    const courses = await Courses.find().populate('Teachers_Details').exec()
    res.json(courses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.getfeedback = async (req, res) => {
  try {
    const feedbacks = await Feedback.find();
    res.json(feedbacks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.getbookings = async (req, res) => {
  try {
    const bookings = await Booking.find().populate('Student_ID').populate('Package_ID').populate('Teacher_ID').populate('Meeting_ID');
    res.json(bookings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// ----------------------------------------------------------------------------------------------------- Payment controllers ------------------

exports.Add_Payment = async (req, res) => {
  try {
    const { Booking_ID, Student_ID, Package_ID, Purchase_Amount, Status, Method } = req.body;
    // Add a payment
    const newPayment = new Payment({
      Booking_ID,
      Student_ID,
      Package_ID,
      Purchase_Amount,
      Status,
      Method,
    });
    // Save the new payment to the database
    await newPayment.save();
    res.status(201).json({ message: 'Payment added successfully', newPayment });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.Delete_Payment = async (req, res) => {
  try {
    const PaymentID = req.params.PaymentID;

    if (!PaymentID) {
      return res.status(400).json({ error: 'Invalid payment ID provided' });
    }

    await Payment.findByIdAndDelete(PaymentID);
    res.json({ message: 'Payment deleted successfully' });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getpayments = async (req, res) => {
  try {
    const payments = await Payment.find()
      .populate([
        {
          path: 'Package_ID',
          populate: [
            {
              path: 'Course_IDs',
              model: 'courses', // Replace with the actual model name for courses
            },
            {
              path: 'Teacher_IDs',
              model: 'teacher', // Replace with the actual model name for teacher
            },
          ],
        },
        {
          path: 'Booking_ID',
        },
        {
          path: 'Student_ID',
        },
      ]);

    res.json(payments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// ----------------------------------------------------------------------------------------------------- Package controllers ------------------

exports.Add_Package = async (req, res) => {
  try {
    const { Course_ID, Package_Amount, Teachers_ID, Number_of_Lectures, Package_Name } = req.body;
    // console.log(Teachers_ID)
    // Initialize arrays if not already provided
    const Teachers_IDs = Array.isArray(Teachers_ID) ? Teachers_ID : [Teachers_ID];
    const Course_IDs = Array.isArray(Course_ID) ? Course_ID : [Course_ID];
    // console.log(Teachers_IDs)
    // Add a package
    const newPackage = new Package({
      Teacher_IDs: Teachers_IDs,
      Course_IDs: Course_IDs,
      Package_Amount: Package_Amount,
      Package_Name:Package_Name,
      Number_of_Lectures: Number_of_Lectures,
    });

    // Save the new package to the database
    await newPackage.save();
    // console.log(newPackage)
    res.status(201).json({ message: 'Package added successfully', newPackage });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.Delete_Package = async (req, res) => {
  try {
    const PackageID = req.params.PackageID;
    if (!PackageID) {
      return res.status(400).json({ error: 'Invalid package ID provided' });
    }
    await Package.findByIdAndDelete(PackageID);
    res.json({ message: 'Package deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.Update_Package = async (req, res) => {
  try {
    const PackageID = req.params.PackageID;
    const { Course_ID, Number_of_Lectures, Package_Amount, Teachers_ID, Package_Name } = req.body
    // Find the package
    const packageResult = await Package.findById(PackageID);
    if (!packageResult) {
      return res.status(404).json({ message: 'Package not found!' });
    }
    // Update Package properties based on req.body
    packageResult.Teacher_IDs = Teachers_ID;
    packageResult.Course_IDs = Course_ID;
    packageResult.Package_Amount = Package_Amount;
    packageResult.Package_Name = Package_Name;
    packageResult.Number_of_Lectures = Number_of_Lectures;
    // Save the updated Package
    const updatedPackage = await packageResult.save();
    // console.log(updatedPackage);
    res.json({ message: 'Package updated successfully', updatedPackage });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.Fetch_Single_Package = async (req,res) => {
  try {
    const packageID = req.params.PackageID
    const package = await Package.findById(packageID).exec()
    res.json({ message: 'Single Package fetched successfully',package });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

exports.getpackages = async (req, res) => {
  try {
    const packages = await Package.find().populate('Teacher_IDs').populate('Course_IDs').populate('Teacher_IDs');
    res.json(packages);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

// --------------------------------------------------------------------------------------------------------Image Controllers -----------------------------------

exports.imageupload = catchAsyncErrors(async (req,res,next) =>{
  try {
        let data = {...req.body}
        if (!data.file || !data.file.trim()) delete data.file;
        if (req.file && req.file.filename){
        data = req.file.filename 
        }
        return res.json({
                        success: true,
                        data,
                        message: 'Image updated successfully'
                      })
    } catch (error) {
             console.log(error,'<< error')
             return next(new ErrorHandler("no Property Added  Found",404))   
      
    }
});

// --------------------------------------------------------------------------------------------------------Accountant Controller ------------------------------

exports.Signup_accountant = catchAsyncErrors( async (req,res,next) => {
  try {
    const { Username, Password  } = req.body;
    // Check if the username already exists
    const existingUser = await Accountant.findOne({ Username });
    if (existingUser) {
      return res.status(409).json({ message: 'Accountant Username already exists' });
    }
    // Create a new Student instance
    const newAccountant = new Accountant({
      Username,
      Password,
    });
    // Save the new Student to the database
    await newAccountant.save();
    const notificationbody = `Hii ${newAccountant.Username}, You Have just Assigned as a Accountant of Speakable_English ,Best of luck`;
    const userid = newAccountant._id
    NotificationHandler_Accountant(notificationbody,userid)
    sendToken(newAccountant, res, 201);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error',error });
  }
});

exports.GetBookingsByStudentID = catchAsyncErrors(async (req, res, next) => {
  const StudentID = req.params.StudentID;
  // console.log(StudentID)
  try {
    const Bookings = await Booking.find({ Student_ID : StudentID }).populate('Student_ID').populate('Teacher_ID').populate('Meeting_ID').populate('Package_ID');
    // console.log(Bookings)
    res.status(200).json({ message: 'Students Booking Fetch successfully', Bookings });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error });
  }
});

exports.GetBookingsByTeacherID = catchAsyncErrors(async (req, res, next) => {
  const Teacher_ID = req.params.TeacherID;
  // console.log(Teacher_ID);
  try {
    const Bookings = await Booking.find({ Teacher_ID: Teacher_ID })
      .populate('Student_ID')
      .populate('Teacher_ID')
      .populate('Meeting_ID')
      .populate('Package_ID')
    // console.log(Bookings);
    if (Bookings.length === 0) {
      return res.status(404).json({ error: 'Teacher Booking not found' });
    }
    return res.status(200).json({ message: 'Teacher Booking Fetch successfully', Bookings });
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error', message: error.message });
  }
});

exports.GetCourseByID = catchAsyncErrors( async (req,res,next) => {
  try {
    const Course_ID = req.params.CourseID
    // console.log(Course_ID)
    const Courses_ = await Courses.find({_id: Course_ID}).populate('Teachers_Details')
    // console.log(Courses_)
    
    if (Courses_.length === 0) {
      return res.status(404).json({ error: 'Course not found' });
    }
    return res.status(200).json({ message: 'Course Fetch successfully', Courses_ });

  } catch (error) {
    console.log(error.message)
  }

})

exports.GetPackageByTeacherID = catchAsyncErrors( async (req,res,next) => {
  try {
    const Teacher_ID = req.params.TeacherID
    // console.log(Teacher_ID)
    const package = await Package.find({Teacher_IDs: Teacher_ID}).populate('Teacher_IDs').populate('Course_IDs')
    // console.log(package)
    
    if (package.length === 0) {
      return res.status(404).json({ error: 'package not found' });
    }
    return res.status(200).json({ message: 'Course Fetch successfully', package });

  } catch (error) {
    console.log(error.message)
  }

})

exports.GetPackageByStudentID = catchAsyncErrors( async (req,res,next) => {
  try {
    const Student_ID = req.params.StudentID
    // console.log(Teacher_ID)
    const package = await Package.find({Teacher_IDs: Teacher_ID}).populate('Teacher_IDs').populate('Course_IDs')
    // console.log(package)
    
    if (package.length === 0) {
      return res.status(404).json({ error: 'package not found' });
    }
    return res.status(200).json({ message: 'Course Fetch successfully', package });

  } catch (error) {
    console.log(error.message)
  }

})

exports.GetPaymentsByStudentID = catchAsyncErrors( async (req,res,next) => {
  try {
    const Student_ID = req.params.StudentID
    console.log(Student_ID);
    const Payments = await Payment.find({Student_ID:Student_ID}).populate([
      {
        path: 'Package_ID',
        populate: [
          {
            path: 'Course_IDs',
            model: 'courses', // Replace with the actual model name for courses
          },
          {
            path: 'Teacher_IDs',
            model: 'teacher', // Replace with the actual model name for teacher
          },
        ],
      },
      {
        path: 'Booking_ID',
      },
      {
        path: 'Student_ID',
      },
    ]);
    if (Payments.length === 0) {
      return res.status(404).json({ error: 'Payments not found' });
    }
    return res.status(200).json({ message: 'Payments Fetch successfully', Payments });
  } catch (error) {
    console.log(error.message)
  }
})

// ----------------------------------------------------------------------------------------------------------- Payment Integration Routes ------------------------


exports.Gethash = catchAsyncErrors( async (req,res,next) => {
  console.log(req.body)
  const { name, email, amount, productinfo, transactionId,key} = req.body

  const data = {
    key: key,
    txnid: transactionId,
    amount: amount,
    productinfo: productinfo,
    firstname: name,
    email: email,
    udf1:'details1',
    udf2:'details2',
    udf3:'details3',
    udf4:'details4',
    udf5:'details5',
  }
  const SALT = "96b5360932f3d432769aa4c77a333486"
  const cryp = crypto.createHash('sha512');
  // sha512(key|txnid|amount|productinfo|firstname|email|udf1|udf2|udf3|udf4|udf5||||||SALT)
  // \$output = hash ("sha512", \$text);
  const string = data.key+'|'+data.txnid+'|'+data.amount+'|'+data.productinfo+'|'+data.firstname+'|'+data.email+'|'+data.udf1+'|'+data.udf2+'|'+data.udf3+'|'+data.udf4+'|'+data.udf5+'||||||'+SALT 
  
  cryp.update(string);
  const hash = cryp.digest('hex');

  return res.status(200).json({
    hash:hash,
    transactionId:transactionId
  })

})


exports.Get_Notifications_by_id = catchAsyncErrors(async (req, res, next) => {
  try {
    const notifications = await Notification.find({ 'userid': req.params.id });
    console.log(notifications);

    return res.status(200).json({ message: 'Notification Fetch successfully', notifications });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});


exports.DeleteNotification_by_id = catchAsyncErrors(async (req, res, next) => {
  try {
    const notifications = await Notification.findByIdAndDelete(req.params.id);
    console.log(notifications);

    return res.status(200).json({ message: 'Notification Deleted successfully', notifications });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});

exports.NotificationsOfAdmin = catchAsyncErrors(async (req, res, next) => {
  try {
    const notifications = await Notification.find();
    console.log(notifications);
    return res.status(200).json({ message: 'All Notifications Fetched successfully', notifications });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});

exports.NotificationsOfAccountant = catchAsyncErrors(async (req, res, next) => {
  try {
    const notifications = await Notification.find({UserType:'accountant'});
    console.log(notifications);
    return res.status(200).json({ message: 'All Notifications of Accountant Fetched successfully', notifications });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});



exports.Make_Payment = catchAsyncErrors(async (req,res,next) => {
  // Combined authorize and make-payment endpoint
    try {
      const authUrl = 'https://secure.snd.payu.com/pl/standard/user/oauth/authorize';
      const authData = 'grant_type=client_credentials&client_id=475638&client_secret=59624ea5a5428ec0d8658ca239b972d8';
  
      const authResponse = await axios.post(authUrl, authData, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });
      function generateTransactionID() {
                const timestamps = Date.now();
                const randomnum = Math.floor(Math.random() * 1000000);
                const merchantPrefix = 'TN';
                const transactionID = `${merchantPrefix}${timestamps}${randomnum}`;
                return transactionID;
            }
  
      const authToken = authResponse.data.access_token;
      const apiUrl = 'https://secure.snd.payu.com/api/v2_1/orders';
      const customerIp = req.clientIp;
      // console.log(req.body)
      const orderCreateRequest = {
        notifyUrl: 'http://localhost:3000/Payment_Notification',
        customerIp,
        merchantPosId: '475638',
        description: req.body.Desciption,
        currencyCode: 'PLN',
        totalAmount: req.body.totalAmount,
        extOrderId: generateTransactionID(),
        buyer: {
          email: req.body.Email,
          phone: req.body.Phone,
          firstName: req.body.StudentName,
        },
        products: [
          {
            name: req.body.Desciption,
            unitPrice: req.body.totalAmount,
            quantity: '1',
          },
        ],
      };
  
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`,
      };

      const paymentResponse = await axios.post(apiUrl, orderCreateRequest, { headers });
      res.status(200).json({ paymentResponseUrl: paymentResponse.request.res.responseUrl });
      // res.status(200).json({ paymentResponse.request.res.responseUrl });
    } catch (error) {
      console.error('Authorization and Payment error:', error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });  

exports.Payment_Notification = catchAsyncErrors(async (req,res) => {
  try {
    // Process the PayU notification
    const payload = req.body;
    console.log('Received PayU Notification:', payload);
  
    // Handle the notification, update your order status, etc.
  
    // Respond to PayU to acknowledge receipt (status 200 OK is important)
    res.status(200).send('OK');  
  } catch (error) {
    res.status(500).json({error})
      console.log(error)
  }
})