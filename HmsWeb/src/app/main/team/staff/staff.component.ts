import { Component, OnInit } from '@angular/core';
import { IMemeber } from '../models/memeber';

@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.css']
})
export class StaffComponent implements OnInit {
  members: IMemeber[] = [
    {
      Name: 'Patti Matalone',
      Credentials: 'R.N',
      Contact: 'PattiRN@DrMatalone.com',
      Picture: '../../../../assets/patti.jpg',
      Bio: `Patti Matalone, R.N. works currently as the Nursing Manager of Holistic Medical Services, Inc.  She has been a Registered Nurse since 1985; she started her career in the Emergency Department at DeKalb Medical Center and worked there for 25 years, and for the last 10 years was a charge nurse.  Over the past 13 years Patti has dedicated herself to Integrative and Holistic Medicine.  She has experiences in trauma nursing, pediatrics, acute cardiac events, strokes, critical care, behavior health, as well as many other emergencies, urgent and non-urgent care.
      Patti’s duties in the office involve every aspect of patient care: treatments and procedures, patient education, staff training, protocol updates; all are within her realm of expertise.  She is very active in self-learning and is passionate about sharing her knowledge.  Patti often attends conferences on a wide variety of topics which include, Nutritional IV therapies, Cancer updates, Ozone use, LDA, Pain Management, Functional Medicine, as well as the American Academy of Environmental Medicine and International College of Integrative Medicine earlier this year.  As well as her attendance to these conferences, she has also maintained BLS, ACLS, TNCC, PALS, and Critical Care certifications.
      Patti’s love for others goes beyond her career.  She believes in helping others and has participated in two Medical Missionary trips.  Her first missions’ trip was to Haiti after the 2010 devastating earthquake. Her home church Victory World Church and her employer partnered together and deployed a team to assist with medical treatments as well as planting several orphanages.  Patti admits she was hesitant to go but a week or so later was so touched and blessed to be used as part of the team, she truly was sad to leave.  Several years later she participated in a mission trip to Nicaragua.  This time she was eager to go and in turn feels like she is the one truly blessed.  `,
    },
    {
      Name: 'Robin Williams',
      Picture: '../../../../assets/robin.jpg',
      Title: 'Patient Care Coordinator',
      Contact: 'Robin@DrMatalone.com',
      Bio: `Robin has been working in integrative medicine with Dr. Matalone for four years. As patient liaison in the practice, she specializes in working with patients to coordinate the best-individualized care. Her degree and background are in Special Education, and her primary interest is helping people.`,
    },
    {
      Name: 'Melissa Pearson',
      Credentials: 'M.A.',
      Contact: 'Melissa@DrMatalone.com',
      Picture: '../../../../assets/melissa.jpg',
      Bio: `With fourteen years of medical assisting experience, Melissa has mastered all procedures offered, including venipuncture, allergy testing (provocation/neutralization and low dose immunotherapy), intravenous administration, ozone therapy administration (rectal, nasal and ear) and patient care. Her medical assistant experience was preceded by an Associate Degree earned at Middle Georgia College and Medical Assistant certification from Sanford Brown Institute in Atlanta. In her spare time, she volunteers as program coordinator for local non-profit, ReNew Atlanta Corporation.`,
    },
    {
      Name: 'Leah Alfaro',
      Picture: '../../../../assets/leah.jpg',
      Title: 'Administrative Assistant',
      Contact: 'Leah@DrMatalone.com',
      Bio: `Leah has worked in integrative medicine for one year as a medical administrative assistant. With her extensive computer skills, she is a major asset to the practice. Lending her knowledge to both front and back office staff, Leah assists with patient letters, office forms, scheduling, blog articles, and all other office needs. Outside of the office, Leah is pursuing a bachelor’s degree at Kennesaw State University in Culinary Sustainability and Hospitality with a minor in Journalism.`,
    },
    {
      Name: 'Jerremy Fleischmann',
      Picture: '../../../../assets/jerremy.jpg',
      Title: 'Supplements Manager',
      Contact: 'Jerremy@DrMatalone.com',
      Bio: `Jerremy is the supplements manager in the office. Although he is new to the team, he has worked in the industry for seven years.  In addition to receiving professional supplement training, he has also spent time studying herbal remedies from Shamans in the Amazon Rainforest and green agriculture from organic farms in Israel.  He graduated from Kennesaw State University with a bachelor’s degree in Business Administration.  In his free time he enjoys playing basketball, working out, and adventuring to unique locations.  “I love meeting new people, so feel free to stop by the store anytime and say ‘hello.’  I will also be happy to answer any questions that you may have.”`,
    },
    {
      Name: 'Eric Hosford',
//      Picture: '../../../../assets/eric.webp',
      Title: 'Administrative Assistant',
      Contact: 'Eric@DrMatalone.com',
      Bio: `Eric is a longtime patient of integrative medicine who now appreciates the chance to assist from the other side of the desk, exercising his writing and editing skills.  He is also a performer outside of business hours.  While Eric often spends his evenings at the theatre, he enjoys providing compositional services, care coordination, and technical updates at the office during the day.`,
    },
  ];
  constructor() { }

  ngOnInit() {
  }

}
