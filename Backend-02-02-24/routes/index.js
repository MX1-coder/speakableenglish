var express = require('express');
var router = express.Router();
const multer = require('multer');
const path = require('path')
const isAuthorizedUser = require('../middleware/auth')
const directpath = path.join(__dirname,'../public/images') 

const { 
        index,
        Signup_Student,
        Signin_Student,
        Signup_Teacher,
        Signin_Teacher,
        Create_Enquiry_Student,
        Fetch_Enquiry_Student,
        Delete_Enquiry_Student,
        Update_Enquiry_Student,
        Signin_admin,
        Signup_admin,
        Signup_user,
        Signin_user,
        Create_Meeting,
        Join_Meeting,
        Delete_Meeting,
        FetchAll_Students,
        currentAdmin,
        signout,
        Fetch5Teachers,
        TeacherDetails,
        Fetch5courses,
        Create_Course,
        Fetch1teacher,
        courseDetails,
        Delete_Student,
        Update_Student,
        Delete_Teacher,
        Update_Teacher,
        Update_Meeting,
        Delete_Course,
        Update_Course,
        getstudentbyID,
        getteachers,
        getteacherbyID,
        getmeetings,
        getenquiries,
        getcourses,
        imageupload,
        Delete_Feedback,
        Update_Feedback,
        getfeedback,
        Create_Booking,
        Delete_Booking,
        Update_Booking,
        getbookings,
        Add_Feedback,
        StudentDetails,
        Signup_accountant,
        Add_Payment,
        Delete_Payment,
        Add_Package,
        Delete_Package,
        Update_Package,
        getpackages,
        getpayments,
        Create_Enquiry,
        Fetch_Single_Package,
        GetBookingsByStudentID,
        GetBookingsByTeacherID,
        GetCourseByID,
        GetPackageByTeacherID,
        GetPaymentsByStudentID,
        Signup_Student_By_Admin,
        Signup_Teacher_By_Admin,
        Gethash,
        Update_Teacher_By_Availability,
        Get_Notifications_by_id,
        DeleteNotification_by_id,
        NotificationsOfAdmin,
        NotificationsOfAccountant,
        Make_Payment,
        Payment_Notification,
        

} = require('../controllers/indexContoller');

// ---------------- Multer Routes For Uploading Images ---------------------------------------------------

const profileStorage = multer.diskStorage({destination : function (req, file, cb){ cb(null, directpath)},
  filename: function (req, file, cb) {
    let ext = file.originalname.substring(file.originalname.lastIndexOf('.'), file.originalname.length);
    cb(null, Date.now() + ext);
  }
});

const upload = multer({
  storage: profileStorage
});

// ------------------------------------------------------------------------- Routes ----------------------

router.get('/', index )

//@api- post/me -- For load user
router.post("/me", isAuthorizedUser, currentAdmin);

router.get('/signout', signout)

// ------------------------------------------------------------------------- Accountant Routes -----------

router.post('/Signup_accountant', Signup_accountant )

// ------------------------------------------------------------------------- User Routes -----------------

router.post("/Signup_user", Signup_user )

router.post("/Signin_user", Signin_user )

// -------------------------------------------------------------------------  Admin Routes ---------------

router.post("/Signup_admin", Signup_admin )

router.post("/Signin_admin", Signin_admin )

// --------------------------------------------------------------------------  Student Routes ------------

router.post("/Signup_Student", Signup_Student )

router.post('/Signup_Student_By_Admin', Signup_Student_By_Admin)

router.post("/Signin_Student", Signin_Student )

router.get('/Delete_student/:student_ID', Delete_Student)

router.get('/FetchAll_students', FetchAll_Students)

router.post('/Update_Student/:StudentID', Update_Student)

router.get('/fetchStudentDetails/:StudentID', StudentDetails)

// -------------------------------------------------------------------------- Teachers Routes ------------

router.post("/Signup_Teacher", Signup_Teacher )

router.post('/Signup_Teacher_By_Admin', Signup_Teacher_By_Admin)

router.post("/Signin_Teacher", Signin_Teacher )

router.get('/Delete_teacher/:teacher_ID', Delete_Teacher)

router.post('/Update_Teacher/:TeacherID', Update_Teacher)

router.post('/Update_Teacher_By_Availability/:TeacherID', Update_Teacher_By_Availability)



router.get('/getteachers', getteachers)

// -------------------------------------------------------------------------- Enquiry Routes --------------

router.get('/Fetch_Enquiry_Student/:Email',  Fetch_Enquiry_Student)

router.post('/Create_Enquiry_Student/:StudentID', Create_Enquiry_Student)

router.get('/Delete_Enquiry_Student/:EnquiryID', Delete_Enquiry_Student)

router.post('/Update_Enquiry_Student/:StudentID/:EnquiryID', Update_Enquiry_Student)

router.get('/getenquiries', getenquiries)

router.post('/Create_Enquiry', Create_Enquiry )

// -------------------------------------------------------------------------- Meeting Routes --------------

router.post('/Create_Meeting/:CreatedBy_ID', Create_Meeting)

router.post('/Join_Meeting/:userId/:meetingId', Join_Meeting) 

router.get('/Delete_meeting/:meeting_ID', Delete_Meeting)

router.post('/Update_Meeting/:MeetingID', Update_Meeting)

router.get('/getmeetings', getmeetings)

// -------------------------------------------------------------------------  Fetch Routes  -------------------

router.get('/Fetch5Teachers', Fetch5Teachers)

router.get('/Fetch1teacher', Fetch1teacher)

router.get('/fetchTeacherDetails/:TeacherID', TeacherDetails)

router.get('/fetchcourseDetails/:CourseID', courseDetails)

// ------------------------------------------------------------------------  Courses Routes  ---------------------

router.get('/Fetch5courses', Fetch5courses)

router.post('/Create_Course', Create_Course)

router.get('/Delete_course/:CourseID', Delete_Course)

router.post('/Update_Course/:CourseID', Update_Course)

router.get('/getcourses', getcourses)

// -------------------------------------------------------------------------  Feedback Routes  -------------------------

router.post('/Add_Feedback', Add_Feedback )

router.get('/Delete_Feedback/:FeedbackID', Delete_Feedback )

router.post('/Update_Feedback/:FeedbackID', Update_Feedback )
 
router.get('/getfeedback', getfeedback )

// -------------------------------------------------------------------------  Booking Routes  -------------------------

router.post('/Create_Booking',Create_Booking )

router.get('/Delete_Booking/:BookingID',Delete_Booking )

router.post('/Update_Booking/:BookingID',Update_Booking )

router.get('/getbookings', getbookings )

// -------------------------------------------------------------------------  Payment Routes  -------------------------

router.post('/Add_Payment', Add_Payment )

router.get('/Delete_Payment/:PaymentID', Delete_Payment )

router.get('/getpayments', getpayments )

// -------------------------------------------------------------------------  Package Routes  -------------------------

router.post('/Add_Package', Add_Package )

router.get('/Delete_Package/:PackageID', Delete_Package )

router.post('/Update_Package/:PackageID', Update_Package )

router.get('/getpackages',getpackages )

router.get('/fetchPackage/:PackageID', Fetch_Single_Package )

// -------------------------------------------------------------------------  Get Routes  -------------------------

router.get('/getstudentbyID/:StudentID', getstudentbyID)

// -------------------------------------------------------------------------------------------------------------------

router.post("/update-image",upload.single('image'),imageupload)

router.get('/GetBookingsByStudentID/:StudentID' , GetBookingsByStudentID)

router.get('/GetBookingsByTeacherID/:TeacherID', GetBookingsByTeacherID )

router.get('/GetCourseByID/:CourseID', GetCourseByID)

router.get('/GetPackageByTeacherID/:TeacherID', GetPackageByTeacherID )

router.get('/GetPaymentsByStudentID/:StudentID', GetPaymentsByStudentID)

router.post('/Gethash', Gethash)


router.get( '/Get_Notifications/:id' , Get_Notifications_by_id)

router.get( '/DeleteNotification/:id' , DeleteNotification_by_id)

router.get( '/NotificationsOfAdmin' , NotificationsOfAdmin)

router.get('/NotificationsOfAccountant' , NotificationsOfAccountant)

router.post('/Make-Payment',Make_Payment)

router.post('/Payment_Notification', Payment_Notification)

module.exports = router;