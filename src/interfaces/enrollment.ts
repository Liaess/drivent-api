import AddressData from "@/interfaces/address";

interface EnrollmentData {
    name: string,
    cpf: string,
    birthday: string,
    address: AddressData,
    phone: string, 
    image: string,
    userId: number
}

export default EnrollmentData;
