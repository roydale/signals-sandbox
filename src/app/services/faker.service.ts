import { DatePipe } from '@angular/common';
import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { faker } from '@faker-js/faker';

@Injectable({
  providedIn: 'root',
})
export class FakerService {
  private datePipe = inject(DatePipe);

  private capitalize(value: string): string {
    return value.replace(/\b\w/g, (char) => char.toUpperCase());
  }

  private createSimpleProfile(
    firstName: string,
    middleName: string,
    lastName: string
  ): any {
    return {
      firstName,
      middleName,
      lastName,
      fullName: `${firstName} ${middleName} ${lastName}`,
      username: faker.internet.username({ firstName, lastName }),
      email: faker.internet.email({ firstName, lastName }),
      password: this.password(),
    };
  }

  private createRandomSimpleProfile(): any {
    const randomBinary = faker.number.int({ min: 0, max: 1 });
    if (randomBinary === 1) {
      return this.simpleMaleProfile();
    } else {
      return this.simpleFemaleProfile();
    }
  }

  private createFullProfile(
    firstName: string,
    middleName: string,
    lastName: string,
    sex?: string
  ): any {
    return {
      firstName,
      middleName,
      lastName,
      fullName: `${firstName} ${middleName} ${lastName}`,
      username: faker.internet.username({ firstName, lastName }),
      email: faker.internet.email({ firstName, lastName }),
      password: this.password(),
      avatar: this.avatar(),
      birthdate: this.birthdate(),
      birthdateString: this.birthdateString(),
      age: this.age(),
      sex: this.capitalize(sex ?? this.sex()),
      address: this.homeAddress(),
      phoneNumber: this.phoneNumber(),
      jobTitle: this.jobTitle(),
      companyName: this.companyName(),
      companyAddress: this.address(),
      bio: this.capitalize(this.bio()),
      createdDate: this.pastDate(),
      createdDateString: this.pastDateString(),
      lastModifiedDate: this.pastDate(),
      lastModifiedDateString: this.pastDateString(),
    };
  }

  private createRandomFullProfile(): any {
    const randomBinary = faker.number.int({ min: 0, max: 1 });
    if (randomBinary === 1) {
      return this.fullMaleProfile();
    } else {
      return this.fullFemaleProfile();
    }
  }

  // Generate short Lorem Ipsum
  private _shortLoremIpsum = signal('');
  get shortLoremIpsum(): WritableSignal<string> {
    this._shortLoremIpsum.set(faker.lorem.words({ min: 5, max: 10 }));
    return this._shortLoremIpsum;
  }

  // Generate medium Lorem Ipsum
  private _mediumLoremIpsum = signal('');
  get mediumLoremIpsum(): WritableSignal<string> {
    this._mediumLoremIpsum.set(faker.lorem.words({ min: 20, max: 50 }));
    return this._mediumLoremIpsum;
  }

  // Generate long Lorem Ipsum
  private _longLoremIpsum = signal('');
  get longLoremIpsum(): WritableSignal<string> {
    this._longLoremIpsum.set(faker.lorem.words({ min: 80, max: 150 }));
    return this._longLoremIpsum;
  }

  // Generate full name
  private _fullName = signal('');
  get fullName(): WritableSignal<string> {
    this._fullName.set(faker.person.fullName());
    return this._fullName;
  }

  // Generate male full name
  private _maleFullName = signal('');
  get maleFullName(): WritableSignal<string> {
    this._maleFullName.set(faker.person.fullName({ sex: 'male' }));
    return this._maleFullName;
  }

  // Generate female full name
  private _femaleFullName = signal('');
  get femaleFullName(): WritableSignal<string> {
    this._femaleFullName.set(faker.person.fullName({ sex: 'female' }));
    return this._femaleFullName;
  }

  // Generate first name
  private _firstName = signal('');
  get firstName(): WritableSignal<string> {
    this._firstName.set(faker.person.firstName());
    return this._firstName;
  }

  // Generate male first name
  private _maleFirstName = signal('');
  get maleFirstName(): WritableSignal<string> {
    this._maleFirstName.set(faker.person.firstName('male'));
    return this._maleFirstName;
  }

  // Generate female first name
  private _femaleFirstName = signal('');
  get femaleFirstName(): WritableSignal<string> {
    this._femaleFirstName.set(faker.person.firstName('female'));
    return this._femaleFirstName;
  }

  // Generate last name
  private _lastName = signal('');
  get lastName(): WritableSignal<string> {
    this._lastName.set(faker.person.lastName());
    return this._lastName;
  }

  // Generate male last name
  private _maleLastName = signal('');
  get maleLastName(): WritableSignal<string> {
    this._maleLastName.set(faker.person.lastName('male'));
    return this._maleLastName;
  }

  // Generate female last name
  private _femaleLastName = signal('');
  get femaleLastName(): WritableSignal<string> {
    this._femaleLastName.set(faker.person.lastName('female'));
    return this._femaleLastName;
  }

  // Generate middle name
  private _middleName = signal('');
  get middleName(): WritableSignal<string> {
    this._middleName.set(faker.person.middleName());
    return this._middleName;
  }

  // Generate male middle name
  private _maleMiddleName = signal('');
  get maleMiddleName(): WritableSignal<string> {
    this._maleMiddleName.set(faker.person.middleName('male'));
    return this._maleMiddleName;
  }

  // Generate female middle name
  private _femaleMiddleName = signal('');
  get femaleMiddleName(): WritableSignal<string> {
    this._femaleMiddleName.set(faker.person.middleName('female'));
    return this._femaleMiddleName;
  }

  // Generate email
  private _email = signal('');
  get email(): WritableSignal<string> {
    this._email.set(faker.internet.email());
    return this._email;
  }

  // Generate male email
  private _maleEmail = signal('');
  get maleEmail(): WritableSignal<string> {
    this._maleEmail.set(
      faker.internet.email({
        firstName: this.maleFirstName(),
        lastName: this.maleLastName(),
      })
    );
    return this._maleEmail;
  }

  // Generate email
  private _femaleEmail = signal('');
  get femaleEmail(): WritableSignal<string> {
    this._femaleEmail.set(
      faker.internet.email({
        firstName: this.femaleFirstName(),
        lastName: this.femaleLastName(),
      })
    );
    return this._femaleEmail;
  }

  // Generate password
  private _password = signal('');
  get password(): WritableSignal<string> {
    this._password.set(
      faker.internet.password({
        length: 20,
      })
    );
    return this._password;
  }

  // Generate job title
  private _jobTitle = signal('');
  get jobTitle(): WritableSignal<string> {
    this._jobTitle.set(faker.person.jobTitle());
    return this._jobTitle;
  }

  // Generate company name
  private _companyName = signal('');
  get companyName(): WritableSignal<string> {
    this._companyName.set(faker.company.name());
    return this._companyName;
  }

  // Generate avatar URL
  private _avatar = signal('');
  get avatar(): WritableSignal<string> {
    this._avatar.set(faker.image.avatar());
    return this._avatar;
  }

  // Generate phone number
  private _phoneNumber = signal('');
  get phoneNumber(): WritableSignal<string> {
    this._phoneNumber.set(faker.phone.number({ style: 'human' }));
    return this._phoneNumber;
  }

  // Generate address
  private _address = signal('');
  get address(): WritableSignal<string> {
    this._address.set(
      `${faker.location.streetAddress(
        false
      )} ${faker.location.city()} ${faker.location.state({
        abbreviated: true,
      })} ${faker.location.zipCode()} ${faker.location.country()}`
    );
    return this._address;
  }

  // Generate home address
  private _homeAddress = signal('');
  get homeAddress(): WritableSignal<string> {
    this._homeAddress.set(
      `${faker.location.streetAddress(
        true
      )} ${faker.location.city()} ${faker.location.state({
        abbreviated: true,
      })} ${faker.location.zipCode()}`
    );
    return this._homeAddress;
  }

  // Generate birthdate
  private _birthdate = signal(
    faker.date.birthdate({ min: 18, max: 60, mode: 'age' })
  );
  get birthdate(): WritableSignal<Date> {
    this._birthdate.set(
      faker.date.birthdate({ min: 18, max: 60, mode: 'age' })
    );
    return this._birthdate;
  }

  // Generate full birthdate string
  private _fullBirthdateString = signal('');
  get fullBirthdateString(): WritableSignal<string> {
    this._fullBirthdateString.set(
      this.datePipe.transform(
        this._birthdate(),
        'EEEE, MMMM dd, yyyy hh:mm:ss a'
      ) || ''
    );
    return this._fullBirthdateString;
  }

  // Generate birthdate string
  private _birthdateString = signal('');
  get birthdateString(): WritableSignal<string> {
    this._birthdateString.set(
      this.datePipe.transform(this._birthdate(), 'MMMM dd, yyyy') || ''
    );
    return this._birthdateString;
  }

  // Generate age
  private _age = signal(0);
  get age(): WritableSignal<number> {
    this._age.set(this.getAge(this._birthdate()));
    return this._age;
  }
  private getAge(birthdate: Date): number {
    const today = new Date();
    let age = today.getFullYear() - birthdate.getFullYear();
    const monthDifference = today.getMonth() - birthdate.getMonth();
    if (
      monthDifference < 0 ||
      (monthDifference === 0 && today.getDate() < birthdate.getDate())
    ) {
      age--;
    }
    return age;
  }

  // Generate gender
  private _gender = signal('');
  get gender(): WritableSignal<string> {
    this._gender.set(faker.person.gender());
    return this._gender;
  }

  // Generate sex
  private _sex = signal('');
  get sex(): WritableSignal<string> {
    this._sex.set(faker.person.sex());
    return this._sex;
  }

  // Generate bio
  private _bio = signal('');
  get bio(): WritableSignal<string> {
    this._bio.set(faker.person.bio());
    return this._bio;
  }

  // Generate past date
  private _pastDate = signal(faker.date.past({ years: 10 }));
  get pastDate(): WritableSignal<Date> {
    this._pastDate.set(faker.date.past({ years: 10 }));
    return this._pastDate;
  }

  // Generate full birthdate string
  private _fullPastDateString = signal('');
  get fullPastDateString(): WritableSignal<string> {
    this._fullPastDateString.set(
      this.datePipe.transform(
        this._pastDate(),
        'EEEE, MMMM dd, yyyy hh:mm:ss a'
      ) || ''
    );
    return this._fullPastDateString;
  }

  // Generate past date string
  private _pastDateString = signal('');
  get pastDateString(): WritableSignal<string> {
    this._pastDateString.set(
      this.datePipe.transform(this._pastDate(), 'MMMM dd, yyyy') || ''
    );
    return this._pastDateString;
  }

  // Generate simple profile
  private _simpleProfile = signal({});
  get simpleProfile(): WritableSignal<any> {
    this._simpleProfile.set(this.createRandomSimpleProfile());
    return this._simpleProfile;
  }

  // Generate multiple simple profiles
  simpleProfiles(count: number): WritableSignal<any[]> {
    const profiles = faker.helpers.multiple(
      this.createRandomSimpleProfile.bind(this),
      {
        count,
      }
    );
    return signal(profiles);
  }

  // Generate simple male profile
  private _simpleMaleProfile = signal({});
  get simpleMaleProfile(): WritableSignal<any> {
    this._simpleMaleProfile.set(
      this.createSimpleProfile(
        this.maleFirstName(),
        this.maleMiddleName(),
        this.maleLastName()
      )
    );
    return this._simpleMaleProfile;
  }

  // Generate simple female profile
  private _simpleFemaleProfile = signal({});
  get simpleFemaleProfile(): WritableSignal<any> {
    this._simpleFemaleProfile.set(
      this.createSimpleProfile(
        this.femaleFirstName(),
        this.femaleMiddleName(),
        this.femaleLastName()
      )
    );
    return this._simpleFemaleProfile;
  }

  // Generate full profile
  private _fullProfile = signal({});
  get fullProfile(): WritableSignal<any> {
    this._fullProfile.set(this.createRandomFullProfile());
    return this._fullProfile;
  }

  // Generate multiple full profiles
  fullProfiles(count: number): WritableSignal<any[]> {
    const profiles = faker.helpers.multiple(
      this.createRandomFullProfile.bind(this),
      {
        count,
      }
    );
    return signal(profiles);
  }

  // Generate full male profile
  private _fullMaleProfile = signal({});
  get fullMaleProfile(): WritableSignal<any> {
    this._fullMaleProfile.set(
      this.createFullProfile(
        this.maleFirstName(),
        this.maleMiddleName(),
        this.maleLastName(),
        'male'
      )
    );
    return this._fullMaleProfile;
  }

  // Generate full female profile
  private _fullFemaleProfile = signal({});
  get fullFemaleProfile(): WritableSignal<any> {
    this._fullFemaleProfile.set(
      this.createFullProfile(
        this.femaleFirstName(),
        this.femaleMiddleName(),
        this.femaleLastName(),
        'female'
      )
    );
    return this._fullFemaleProfile;
  }

  // Generate credit card number
  private _creditCardNumber = signal('');
  get creditCardNumber(): WritableSignal<string> {
    this._creditCardNumber.set(faker.finance.creditCardNumber());
    return this._creditCardNumber;
  }

  // Generate account number
  private _accountName = signal('');
  get accountName(): WritableSignal<string> {
    this._accountName.set(faker.finance.accountName());
    return this._accountName;
  }

  // Generate account number
  private _accountNumber = signal('');
  get accountNumber(): WritableSignal<string> {
    this._accountNumber.set(faker.finance.accountNumber());
    return this._accountNumber;
  }

  // Generate routing number
  private _routingNumber = signal('');
  get routingNumber(): WritableSignal<string> {
    this._routingNumber.set(faker.finance.routingNumber());
    return this._routingNumber;
  }

  // Generate very small amount
  private _verySmallAmount = signal(0.0);
  get verySmallAmount(): WritableSignal<number> {
    this._verySmallAmount.set(
      parseFloat(faker.finance.amount({ min: 1, max: 99, dec: 2 }))
    );
    return this._verySmallAmount;
  }

  // Generate small amount
  private _smallAmount = signal(0.0);
  get smallAmount(): WritableSignal<number> {
    this._smallAmount.set(
      parseFloat(faker.finance.amount({ min: 100, max: 999, dec: 2 }))
    );
    return this._smallAmount;
  }

  // Generate medium amount
  private _mediumAmount = signal(0.0);
  get mediumAmount(): WritableSignal<number> {
    this._mediumAmount.set(
      parseFloat(faker.finance.amount({ min: 1000, max: 9999, dec: 2 }))
    );
    return this._mediumAmount;
  }

  // Generate large amount
  private _largeAmount = signal(0.0);
  get largeAmount(): WritableSignal<number> {
    this._largeAmount.set(
      parseFloat(faker.finance.amount({ min: 10000, max: 99999, dec: 2 }))
    );
    return this._largeAmount;
  }

  // Generate very large amount
  private _veryLargeAmount = signal(0.0);
  get veryLargeAmount(): WritableSignal<number> {
    this._veryLargeAmount.set(
      parseFloat(faker.finance.amount({ min: 100000, max: 1000000, dec: 2 }))
    );
    return this._veryLargeAmount;
  }

  // Generate vehicle
  private _vehicle = signal('');
  get vehicle(): WritableSignal<string> {
    this._vehicle.set(faker.vehicle.vehicle());
    return this._vehicle;
  }

  // Generate product name
  private _productName = signal('');
  get productName(): WritableSignal<string> {
    this._productName.set(faker.commerce.productName());
    return this._productName;
  }

  // Generate color
  private _color = signal('');
  get color(): WritableSignal<string> {
    this._color.set(this.capitalize(faker.color.human()));
    return this._color;
  }

  // Generate colorHex
  private _colorHex = signal('');
  get colorHex(): WritableSignal<string> {
    this._colorHex.set(faker.color.rgb().toLocaleUpperCase());
    return this._colorHex;
  }
}
