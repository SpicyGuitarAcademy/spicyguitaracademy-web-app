import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { ContactUs, ErrorPage, ForgotPassword, LandingPage, Login, Register, ResetPassword, SharedFeaturedCourse, VerifyAccount, VerifyDevice } from './pages/public';
import { Welcome, Home, StudyingCourses, AllCourses, CourseLessons, Tutorial, FeaturedCourses, BoughtCourses, CourseDetails, Forum, Notification, Profile, EditProfile, EditPassword, InviteFriend, Category, PreviousCategories, Subscription, PaymentMethods, BuyMoreUnits, SearchCourses, Help, CourseAssignments, AssignmentQuestion, CompletedCourse, CompletePaymentWithPaystack, CompletePaymentWithPaypal, CashOutUnits } from './pages/authenticated'
import { ConfirmModal, DynamicModal, LoadingModal, ToastWrapper } from './components';
import { useCallback, useEffect } from 'react';
import { useModalStore } from './store';

function App() {

  const { loading } = useModalStore()

  const bootApp = useCallback(async () => {
    loading(true, "Booting App...")
    setTimeout(() => {
      // check that the stores have been hydrated
      loading(false)
    }, 500);
  }, [loading])

  useEffect(() => {
    bootApp()
  }, [bootApp])

  return (
    <>
      <ToastWrapper />
      <ConfirmModal />
      <DynamicModal />
      <LoadingModal />
      <BrowserRouter>
        <Switch>
          <Route exact path='/' component={LandingPage} />
          <Route exact path='/register' component={Register} />
          <Route exact path='/login' component={Login} />
          <Route exact path='/forgot-password' component={ForgotPassword} />
          <Route exact path='/verify-account' component={VerifyAccount} />
          <Route exact path='/reset-password' component={ResetPassword} />
          <Route exact path='/verify-device' component={VerifyDevice} />
          <Route exact path='/contact-us' component={ContactUs} />
          <Route exact path='/featured/:id' component={SharedFeaturedCourse} />

          {/* Authenticated pages */}
          <Route exact path='/welcome' component={Welcome} />
          <Route exact path='/dashboard' component={Home} />
          <Route exact path='/dashboard/courses' component={StudyingCourses} />
          <Route exact path='/dashboard/courses/all' component={AllCourses} />
          <Route exact path='/dashboard/courses/search' component={SearchCourses} />
          <Route exact path='/dashboard/courses/lessons' component={CourseLessons} />
          <Route exact path='/dashboard/courses/assignment' component={CourseAssignments} />
          <Route exact path='/dashboard/courses/assignment/question' component={AssignmentQuestion} />
          <Route exact path='/dashboard/tutorial' component={Tutorial} />
          <Route exact path='/dashboard/courses/complete' component={CompletedCourse} />
          <Route exact path='/dashboard/courses/bought' component={BoughtCourses} />
          <Route exact path='/dashboard/courses/featured' component={FeaturedCourses} />
          <Route exact path='/dashboard/courses/details' component={CourseDetails} />
          <Route exact path='/dashboard/profile' component={Profile} />
          <Route exact path='/dashboard/forum' component={Forum} />
          <Route exact path='/dashboard/notifications' component={Notification} />
          <Route exact path='/dashboard/profile/update' component={EditProfile} />
          <Route exact path='/dashboard/profile/update-password' component={EditPassword} />
          <Route exact path='/dashboard/profile/invite' component={InviteFriend} />
          <Route exact path='/dashboard/profile/category' component={Category} />
          <Route exact path='/dashboard/profile/category/previous' component={PreviousCategories} />
          <Route exact path='/dashboard/profile/subscription' component={Subscription} />
          <Route exact path='/dashboard/help' component={Help} />
          <Route exact path='/dashboard/payment/methods' component={PaymentMethods} />
          <Route exact path='/dashboard/payment/paystack/complete' component={CompletePaymentWithPaystack} />
          <Route exact path='/dashboard/payment/paypal/complete' component={CompletePaymentWithPaypal} />
          <Route exact path='/dashboard/payment/spicyunits' component={BuyMoreUnits} />
          <Route exact path='/dashboard/payment/spicyunits/cashout' component={CashOutUnits} />

          {/* Error Page */}
          <Route component={ErrorPage} />

        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
