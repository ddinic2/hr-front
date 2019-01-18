import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'hr-employee-profil',
  templateUrl: './employee-profil.component.html',
  styleUrls: ['./employee-profil.component.scss']
})
export class EmployeeProfilComponent implements OnInit {
  panelOpenState = false;
  fileToUpload: File = null;
  checkedSingleParent = false;
  checkedInsured = false;
  checkedIsActiveDegree = true;
  showFormForMember: any;

  constructor(private fb: FormBuilder, public snackBar: MatSnackBar) { }

  basicData = this.fb.group({
    PassEmployee: [''],
    FirstName: [''],
    LastName: [''],
    Gender: [''],
    Birthday: [''],
    JMBG: [''],
    PlaceOfBirthday: [''],
    Email: [''],
    CompanyPhone: [''],
    Poenter: [''],
    MaidenName: [''],
    BloodType: [''],
    ParentName: [''],
    StatusOfEmployee: [''],
    Note: [''],
  });

  employmentData = this.fb.group({
    StartWork: [''],
    ContractDate: [''],
    AnexStart: [''],
    DelNumber: [''],
    ContractNumber: [''],
    EmployementType: [''],
    WorkintTimeType: [''],
    StartDate: [''],
    EndDate: [''],
    ShiftWork: [''],
    DocumentLabel: [''],
    Percentage: [''],
  });

  personalFamilyData = this.fb.group({
    TelephoneFix: [''],
    MobilePhone: [''],
    PlaceOfBirth: [''],
    MunicipalityOfBirth: [''],
    CitizenShip: [''],
    Ethnicity: [''],
    Nationality: [''],
    ReligiousHoliday: [''],
    Bank: [''],
    MeritalStatus: [''],
    CheckedSingleParent: [''],
    EmailPrivate: [''],
    BankAccountNumber: [''],
    DegreeOfDisability: [''],
    DescriptionOfDisability: [''],
    InjuriesAtWork: [''],
    ContactPersonName: [''],
    ContactPersonPhone: ['']
  });

  familyMember  = this.fb.group({
    FirstName: [''],
    LastName: [''],
    Relation: [''],
    BirthdayMember: [''],
    GenderOfMember: [''],
    JMBG: [''],
    Place: [''],
    Municipality: [''],
    Address: [''],
    Job: [''],
    NumberOfHealthBooks: [''],
    ContactData: [''],
    CheckedInsured: [''],
    Note: ['']
  });

  personalEducation = this.fb.group({
    NameOfSchool: [''],
    Profession: [''],
    IdOfProfession: [''],
    TypeOfSchool: [''],
    DateOfIssue: [''],
    DateOfAcquisition: [''],
    BeginningOfSchooling: [''],
    EndOfSchooling: [''],
    ProfessionalQualifications: [''],
    DegreeNumber: [''],
    CheckedIsActiveDegree: [''],
    Note: ['']
  });

handleFileInput(files: FileList) {
  this.fileToUpload = files.item(0);
}

handleFileInput1(files: FileList) {
  this.fileToUpload = files.item(0);
}

// Ovo je upload dokumenta
// uploadFileToActivity() {
//   this.fileUploadService.postFile(this.fileToUpload).subscribe(data => {
//     // do something, if upload success
//     }, error => {
//       console.log(error);
//     });
// }

// Ovo u servisu
// postFile(fileToUpload: File): Observable<boolean> {
//   const endpoint = 'your-destination-url';
//   const formData: FormData = new FormData();
//   formData.append('fileKey', fileToUpload, fileToUpload.name);
//   return this.httpClient
//     .post(endpoint, formData, { headers: yourHeadersConfig })
//     .map(() => { return true; })
//     .catch((e) => this.handleError(e));
// }

saveBasicData() {
  console.log('Osnovi podaci', this.basicData.value);
}

saveEmploymentData() {
  console.log('Podaci o zaposlenju', this.employmentData.value);
}

savePersonalFamilyData() {
  console.log('Licni porodicni podaci', this.personalFamilyData.value);
}

showFormForAddFamiliMemeber() {
  this.showFormForMember = true;
}

savePersonalDataForMember() {
  console.log('Licni podaci za clana porodice', this.familyMember.value);
}

savePersonalEducation() {
  console.log('Obrazovanje', this.personalEducation.value);
}

  ngOnInit() {
    this.showFormForMember = false;
  }

}
