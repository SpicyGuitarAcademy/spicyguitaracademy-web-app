import { DashboardWrapper } from "../../../components"
import { ArrowLeft } from "react-feather";
import { useHistory } from "react-router-dom";
import './style.scss'

export const Help: React.FC<{}> = () => {

  const { goBack } = useHistory()

  const questions = [
    {
      title: 'Questions about learning the Guitar at Spicy Guitar Academy',
      questions: [
        {
          question: 'What does Spicy Guitar Academy offer as an Online Guitar Learning Platform?',
          answer: <div>
            <p>Spicy Guitar Academy provides an effective online guitar learning platform and makes guitar learning easy with all her features.</p>
            <ul>
              <li>Experienced and passionate Tutors.</li>
              <li>Step-by-step and focused lessons from beginners through professional or advanced level.</li>
              <li>A user-friendly mobile application.</li>
              <li>Learning at your convenience and pace.</li>
              <li>Audio backing track with adjustable tempo for practice and mastery of each lesson.</li>
              <li>A forum where students are animated by the tutors, share ideas and get responses to questions.</li>
              <li>Assessment tests (assignments) for each course.</li>
              <li>Life-time access to featured courses which contains target-lessons or choice lessons when purchased.</li>
              <li>Get replies privately to private questions asked on any lesson.</li>
              <li>Get guitar tablature of our guitar lessons for easy understanding.</li>
            </ul>
          </div>
        }
      ]
    },
    {
      title: 'Questions about Spicy Guitar Academy Mobile Application',
      questions: [
        {
          question: 'How do I become a student at Spicy Guitar Academy?',
          answer: 'Download the mobile application from Google Play Store and Apple Store (in progress), or through www.spicyguitaracademy.com. Sign up and register by filling the form with your correct details. Once that is done, you automatically become a student of the academy and you have access to many free videos and other amazing features.'
        },
        {
          question: 'About Subscription plan',
          answer: <div>
            <ul>
              <li>Monthly (1 month)</li>
              <li>Quarterly (3 months)</li>
              <li>Bi-annually (6 months)</li>
              <li>Annual (12 months)</li>
            </ul>

            <p>All subscription plans give you access to all the premium features of the app.</p>
          </div>
        },
        {
          question: 'Can students have access to videos without paying for subscriptions?',
          answer: 'Yes, all students have access to amazing free lessons.'
        },
        {
          question: 'Can Students buy Specific Courses that they are interested in?',
          answer: 'Yes, there are target or specific courses (called FEATURED COURSES) that treat specific topics, themes, genres or areas in guitar playing. These courses contain various lessons and can be purchased by students regardless of their category or subscription.'
        },
        {
          question: 'What are the benefits of purchasing "Featured Courses"?',
          answer: <div>
            <ul>
              <li>Life-time access to the purchased course; in other words, with or without subscription, you have access to courses purchased.</li>
              <li>Access to practice loop attached to the lessons.</li>
              <li>Access to guitar tablature attached to the lessons.</li>
              <li>Students have private portal to ask the tutor questions and get quick replies on every lesson.</li>
              <li>When there is an upgrade on the lessons of course, the new lessons will be automatically added.</li>
            </ul>
          </div>
        },
        {
          question: 'How do I graduate from one category to the next one?',
          answer:
            <div>
              <ul>
                <li>Step one: Complete all the assignments in all courses of your category.</li>
                <li>Step two: The tutor marks and rates all your assignments.</li>
                <li>Step three: If you qualify to progress then you can proceed to the Graduation course.</li>
                <li>Step four: Proceed to the category section to choose next category.</li>
                <li>Step five: When your request is approved by the tutor, you will be moved to the next category.</li>
              </ul>
            </div>
        },
        {
          question: 'How do I submit assignments?',
          answer:
            <div>
              <ul>
                <li>Assignments are submitted in text or / and video file.</li>
                <li>Some assignments will require that you submit only text, some will require only video, and others will require both.</li>
                <li>Submit text by writing down the answers in the given space for text.</li>
                <li>Submit video by clicking on the file icon, searching for the required video and uploading.</li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
              </ul>
            </div>
        },
        {
          question: 'How do I join the Student\'s Chat Forum?',
          answer: 'Only subscribed students have access to the Student\'s Chat Forum.'
        },
        {
          question: 'How can I ask questions on Spicy Guitar Academy App?',
          answer: 'Students can ask questions privately to the tutors on every lesson, on the Student\'s Chat Forum and on the Contact Us section of the App'
        },
        {
          question: 'Can I reduce or increase the tempo of the video and the audio practice loop?',
          answer: 'Yes! Videos and audio have a feature that reduces or increases the tempo of the lesson or audio(practice loop).'
        },
        {
          question: 'What happens when my Subscription Expires?',
          answer: 'When your subscription expires, your access to the courses will be paused till you renew your subscription.This pause also applies to access to the Student\'s Chat forum, however you will have access to free lessons and already purchased featured courses.'
        },
        {
          question: 'Which should I Pick? Subscribing or buying Featured Courses?',
          answer: <div>
            <ul>
              <li>Subscription is for students that want to be guided all round.</li>
              <li>Subscription provides step by step lessons to students at every category.</li>
              <li>Subscription follows the academic curriculum of SPICY GUITAR ACADEMY.</li>
              <li>Subscription has added features of assignments for students, Graduation and certification for students.</li>
              <li>Featured Courses are for students who are interested in specific topics, themes, genres or areas in guitar playing.</li>
            </ul>
          </div>
        }
      ]
    },
    {
      title: 'Questions about playing the Guitar',
      questions: [
        {
          question: 'How often should I practice the guitar?',
          answer: <div>
            <p>It is good to practice at least 30mins or 1hr a day. Make this your practice habit:</p>
            <ul>
              <li>Practice your finger drill exercises.</li>
              <li>Practice chords changes on different positions using slow to higher tempo.</li>
              <li>Practice different guitar lines and rhythms, sequences and licks.</li>
              <li>Play these sequences and licks on metronome or backing track (or loop)</li>
            </ul>
          </div>
        },
        {
          question: 'Should I start with an acoustic or electric guitar?',
          answer: <div>
            <p>As a beginner, SPICY GUITAR ACADEMY recommends that you use Acoustic Guitar with Nylon Strings. Here are some reasons:</p>
            <ul>
              <li>Acoustic guitar has a sound hole that amplifies the sound and this helps the beginner guitarist to notice errors in their play and help them to audibly hear/enjoy what they are playing.</li>
              <li>The acoustic guitar is convenient such that you don\'t need to rely on guitar amp before you can practice and play.</li>
              <li>One of the reasons why people give up on learning the guitar is because steel strings hurt their fingers. If you have access to only steel strings, make sure that the tuning is reduced to at least 3 semitones (a standard tuning of EADGBE will now become C#F#BEG#C#).</li>
              <li>Nylon strings, on the other hand, are gentle on the fingers and the tension is less, such that guitarists do not need to apply much pressure before they hold note(s).</li>
            </ul>
          </div>
        },
        {
          question: 'What is the Guitar Tablature and why is it important?',
          answer: 'Guitar tablature is a visual representation of music played on the guitar. It indicates the notes, chords, rhythm and techniques played in a guitar musical piece. It makes learning easy because it is easy to read and understand, and it can help players decipher and decode hard licks and play them with the correct timing.'
        }
      ]
    }
  ]

  return (
    <DashboardWrapper>
      <div className="__studying_course_page">

        <div className="__greetings mb-4 d-flex justify-content-between align-items-center">
          <h2 className="fw-bold d-flex align-items-center m-0">
            <button onClick={goBack} className="btn btn-sm btn-muted p-0 me-2">
              <ArrowLeft size={24} className='text-primary' />
            </button>
            Help
          </h2>
        </div>

        <div className="__comments mb-5 text-dark w-100 d-flex flex-column gap-3">
          {
            questions?.map((question, i) => (
              <div key={i} className='mb-4' >
                <h5 className="text-primary fw-bold mb-3">{question.title}</h5>

                {
                  question?.questions?.map((q, j) => (
                    <div key={j} className="accordion-item">
                      
                      <h5 className="accordion-header" id={"flushheading" + i + j}>
                        <button className={`accordion-button fs-6 fw-normal text-dark ${i === 0 && j === 0 ? '' : 'collapsed'}`} type="button" data-bs-toggle="collapse" data-bs-target={"#flushcollapse" + i + j} aria-expanded={i === 0 && j === 0 ? "true" : "false"} aria-controls={"flushcollapse" + i + j}>
                          {q.question}
                        </button>
                      </h5>

                      <div id={"flushcollapse" + i + j} className={`accordion-collapse collapse ${i === 0 && j === 0 && "show"}`} aria-labelledby={"flushheading" + i + j} data-bs-parent="#qAccordion">
                        <div className="accordion-body">
                          <p className="text-muted">{q.answer}</p>
                        </div>
                      </div>

                    </div>
                  ))
                }

              </div>
            ))
          }
        </div>

      </div>
    </DashboardWrapper>
  )
}