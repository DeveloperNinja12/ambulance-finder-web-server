export namespace DTOs {
    export type AddDoctorRequest = {
        doctorName: string;
        designation: string;
        location: string;
        careerObject: string;
        qualifications: string[];
        experience: string;
        fees: number;
        availability: string;
        languages: string[];
        email: string;
    };

    export type AddAmbulanceRequest = {
        vehicleNumber: string;
        vehicleType: string;
        vehicleModel: string;
        vehicleYear: number;
        vehicleColor: string;
        vehicleAssignedDriver: string;
        vehicleLocation: string;
        vehicleContactNumber: string;
        vehicleHospital: string;
    };
}

