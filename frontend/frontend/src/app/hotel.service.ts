import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Room } from './room-information';
import { Router } from '@angular/router';
import { Hotel } from './hotel-information';

@Injectable({
  providedIn: 'root'
})
export class HotelService {

  //var ROOT_URL = "http://hotelmanagement-env.eba-byszbdrw.us-east-2.elasticbeanstalk.com"
  constructor(private http: HttpClient, private router: Router) { }
  datadescription: any;
  dateResponse: any;
  roomResponse: [];
  roomList: [];
  singleRoomInfo: any;
  totalBill: any;
  userBookingInfo: any;
  upadateHotelInformation: Hotel;
  adminHotelList() {
    return this.http.get<any>('http://hotelmanagement-env.eba-byszbdrw.us-east-2.elasticbeanstalk.com/getHotelList');

  }

  deleteHotelInfo(data) {
    console.log(data);
    return this.http.delete(`http://hotelmanagement-env.eba-byszbdrw.us-east-2.elasticbeanstalk.com/deleteHotel/${data.hotelId}`);
  }

  updateHotelInfo(data) {
    console.log(data);
    return this.http.put('http://hotelmanagement-env.eba-byszbdrw.us-east-2.elasticbeanstalk.com/updateHotelInformation', data);
  }


  addHotel(data): Observable<any> {
    console.log(data);
    return this.http.post<any>('http://hotelmanagement-env.eba-byszbdrw.us-east-2.elasticbeanstalk.com/addHotel', data);
  }

  singleHotelData(data) {
    console.log(data);
    this.http.post<any>('http://hotelmanagement-env.eba-byszbdrw.us-east-2.elasticbeanstalk.com/getRoomListForUser', data).subscribe((response) => {
      console.log('..........user room list service hotel servie', response);
      // this.roomResponse = response;
      this.roomList = response.roomList;
      console.log(this.roomList);
      // if (this.roomList != null) {
      this.router.navigateByUrl('/vertical-header/user-room-list');
      // }

    },
      err => {
        console.log(err);
      }
    );
    return this.roomList;
  }

  userRoomBooking(room) {
    console.log(room);
    this.singleRoomInfo = room;
    this.router.navigateByUrl('/vertical-header/user-room-booking');
  }

  addUserBooking(data): Observable<any> {
    console.log(data);
    return this.http.put<any>('http://hotelmanagement-env.eba-byszbdrw.us-east-2.elasticbeanstalk.com/userRoomBooking', data);
  }

  calculateTotalDays(data) {
    console.log(data);
    this.http.post<any>('http://hotelmanagement-env.eba-byszbdrw.us-east-2.elasticbeanstalk.com/calculateTotalDaysAmount', data).subscribe((response) => {
      console.log('..........total amount response', response);
      this.datadescription = response.description;
      this.dateResponse = response.message;

      if (this.dateResponse === 'Failure') {
        console.log('................dateResponse', this.dateResponse);
        this.totalBill = this.dateResponse;
      } else {
        this.totalBill = response.totalBill;
        console.log('....total bill', this.totalBill);
      }
    },
      err => {
        console.log(err);
      }
    );
    return this.totalBill;
  }

  hotelInfoForUpdation(hotelList) {
    console.log('...........in hotel service..........', hotelList);
    this.upadateHotelInformation = hotelList;

    console.log('.......updateHotelInfo.......', this.upadateHotelInformation);
    this.router.navigateByUrl('/vertical-header/admin-update-hotel');

  }

  adminBookingReport() {
    console.log('.................');
    return this.http.get<any>('http://hotelmanagement-env.eba-byszbdrw.us-east-2.elasticbeanstalk.com/getBookingHistoryForAdmin');

  }

  userBookingReport(userData) {
    console.log('.................');

    console.log('..........userData', userData);
    return this.http.post<any>('http://hotelmanagement-env.eba-byszbdrw.us-east-2.elasticbeanstalk.com/getBookingHistoryForUser', userData);


  }


  singleHotelDataForVisitor(data) {
    console.log(data);
    this.http.post<any>('http://hotelmanagement-env.eba-byszbdrw.us-east-2.elasticbeanstalk.com/getRoomListForUser', data).subscribe((response) => {
      console.log('..........user room list service hotel servie', response);
      this.roomList = response.roomList;
      console.log(this.roomList);
      this.router.navigateByUrl('/visitorroom');

    },
      err => {
        console.log(err);
      }
    );
    return this.roomList;
  }


  deleteRoomBooking(data) {
    console.log(data);
    return this.http.delete(`http://hotelmanagement-env.eba-byszbdrw.us-east-2.elasticbeanstalk.com/cancelBooking/${data.bookingId}`);
  }
}
