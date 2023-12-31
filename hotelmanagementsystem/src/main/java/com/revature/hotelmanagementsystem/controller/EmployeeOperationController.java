package com.revature.hotelmanagementsystem.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import com.revature.hotelmanagementsystem.bean.AdminEmployeeUserBean;
import com.revature.hotelmanagementsystem.bean.BookingInformationBean;
import com.revature.hotelmanagementsystem.bean.EmployeeInformationBean;
import com.revature.hotelmanagementsystem.bean.HotelInformationBean;
import com.revature.hotelmanagementsystem.bean.RoomInformationBean;
import com.revature.hotelmanagementsystem.exception.HotelManagementSystemException;
import com.revature.hotelmanagementsystem.response.HotelManagementResponse;
import com.revature.hotelmanagementsystem.service.EmployeeOperationService;

@RestController
//@CrossOrigin(origins = "*", allowedHeaders = "*", allowCredentials = "true" , methods = {RequestMethod.GET,RequestMethod.POST,RequestMethod.PUT,RequestMethod.DELETE})
public class EmployeeOperationController {

	@Autowired
	private EmployeeOperationService employeeOperationService;

	@PostMapping(path = "/getRoomListForEmployee")
	public HotelManagementResponse getRoomListForEmployee(@RequestBody AdminEmployeeUserBean adminEmployeeUserBean) {
		//String licenceNumber = roomInformationBean.getLicenceNumber();
		HotelManagementResponse response = new HotelManagementResponse();
		//try {
			List<RoomInformationBean> roomList = employeeOperationService.getRoomList(adminEmployeeUserBean);
			if (roomList != null && !roomList.isEmpty()) {
				response.setStatusCode(200);
				response.setMessage("Success");
				response.setDescription("room list displayed");
				response.setRoomList(roomList);
				;
			} else {
//				response.setStatusCode(400);
//				response.setMessage("Failed");
//				response.setDescription("room list can't be fetched");
				throw new HotelManagementSystemException("room list can't be fetched");
			}
//		} catch (Exception e) {
//			response.setStatusCode(400);
//			response.setMessage("Failed");
//			response.setDescription(e.getMessage());
//			System.out.println(e.getMessage());
//		}
		return response;
	}// end of getRoomListForEmployee

	@PostMapping(path = "/getHotelInfoForEmployee")
	public HotelManagementResponse getHotelInfoForEmployee(@RequestBody AdminEmployeeUserBean adminEmployeeUserBean) {
		//String licenceNumber = hotelInformationBean.getLicenceNumber();
		HotelManagementResponse response = new HotelManagementResponse();
	//	try {
			HotelInformationBean hotelInfo = employeeOperationService.getHotelInformation(adminEmployeeUserBean);
			if (hotelInfo != null) {
				response.setStatusCode(200);
				response.setMessage("Success");
				response.setDescription("hotel Info displayed");
				response.setHotelInformationBean(hotelInfo);
				
			} else {
//				response.setStatusCode(400);
//				response.setMessage("Failed");
//				response.setDescription("hotel Info can't be fetched");
				throw new HotelManagementSystemException("hotel Info can't be fetched");
			}
//		} catch (Exception e) {
//			response.setStatusCode(400);
//			response.setMessage("Failed");
//			response.setDescription(e.getMessage());
//			System.out.println(e.getMessage());
//		}
		return response;
	}// end of getHotelInfoForEmployee

	@PutMapping(path = "/hotelBookingFromEmployee", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	public HotelManagementResponse hotelBookingFromEmployee(
			@RequestBody BookingInformationBean bookingInformationBean) {
		System.out.println("......booking......"+bookingInformationBean);
		HotelManagementResponse response = new HotelManagementResponse();
		BookingInformationBean bookingInformationBean1 = null;
	//	try {
			bookingInformationBean1 = employeeOperationService.bookUser(bookingInformationBean);
			if (bookingInformationBean1 != null) {
				response.setStatusCode(200);
				response.setMessage("Success");
				response.setDescription("room booked successfully");

			} else {
//				response.setStatusCode(400);
//				response.setMessage("Failed");
//				response.setDescription("Unable to book room");
				throw new HotelManagementSystemException("Unable to book room");
			}
//		} catch (Exception e) {
//			response.setStatusCode(400);
//			response.setMessage("Failed");
//			response.setDescription(e.getMessage());
//			System.out.println(e.getMessage());
//		}
		return response;
	}// end of hotelBookingFromEmployee

}// end of class
