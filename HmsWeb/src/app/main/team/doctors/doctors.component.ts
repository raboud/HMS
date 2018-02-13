import { Component, OnInit } from '@angular/core';
import { IMemeber } from '../models/memeber';

@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html',
  styleUrls: ['./doctors.component.css']
})
export class DoctorsComponent implements OnInit {
  members: IMemeber[] = [
    {
      Name: 'Frank Matalone',
      Credentials: 'D.O., N.M.D.',
      Contact: '',
      Bio: `Dr. Matalone earned a BS in Psychology from the University of Arizona in 1983.  He worked for 7 years at Tucson Medical Center
      as an orderly and Emergency Room EMT prior to entering the University of Osteopathic Medicine and Health Sciences, graduating in 1990
      with his D.O. (Doctor of Osteopathy) degree.  He completed a 1-year AOA approved rotating internship at Northlake Regional Medical
      Center in Atlanta, GA 1990-91 and then went on to a 3 year Emergency Medicine residency at SUNY Stony Brook 1991-94.  He practiced
      Emergency Medicine for 11 years here in Atlanta at various hospitals and also practiced Occupational Medicine and Urgent Care work.
      It was during the later years of his conventional medical work that he recognized that short of immediate needs and true lifesaving
      emergencies, pharmaceutical-based medicine was a failure in healing any patient, and the numerous drug side effects and deaths were
      disturbing even though they were "approved."
      Opening his eyes to other long-practiced medical methods like Naturopathy excited him and he earned an N.M.D. (Naturopathic Medical
      Doctor) from Southern Graduate Institute of St. Luke's School of Medicine.  Over his career in medicine, he has been board-certified
      in Emergency Medicine and presently, Holistic and Integrative Medicine.  Interests in pain management as well as ozone therapies have
      earned him a Diplomate of the American Academy of Pain Management and advanced certifications as an ozone practitioner through the
      American Academy of Ozonotherapy.
      So what does all this mean to a patient?  For over 25 years, his heightened level of training in both conventional and alternative
      medicine with these additional certifications allows for a comprehensive healing approach to patient wellness. He regularly attends
      diverse medical conferences to stay abreast of his specialty.`,
      Picture: '../../../../assets/frank.jpg',
      Quote: `God designed the body to heal and I was put here by Him to assist in the process. I am thankful for the gifts He has given me.
      If I can't help in your healing I will try to refer you to someone who perhaps can.`,
      FullCreds: 'D.O., N.M.D., A.B.I.H.M., D.A.A.P.M., F.A.A.O. A.P.T.'
    }
  ];

  constructor() { }

  ngOnInit() {
  }

}
