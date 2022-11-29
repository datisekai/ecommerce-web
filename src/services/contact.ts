import axiosClient from "../config/axiosClient"
import { Contact } from "../models/contact.model";

type ContactApiProps = {
    getAllContact:() => Promise<Contact[]>
    addContact:(data:ContactAdd) => Promise<Contact>
    deleteContact:(id:number) => Promise<Contact>
    updateContact:(data:ContactUpdate) => Promise<Contact>
    setDefaultContact:(id:string | number) => Promise<Contact>
}

type ContactUpdate = {
    id:number,
    address?:string,
    phone?:string,
    name?:string
    active?:boolean
}

type ContactAdd = {
    address:string,
    phone:string,
    name:string
}

const ContactApi:ContactApiProps = {
    getAllContact:async () => {
        const result = await axiosClient.get('/user/contact');
        return result.data;
    },
    addContact:async(data) => {
        const result = await axiosClient.post('/user/contact',data);
        return result.data
    },
    deleteContact:async(id) => {
        const result = await axiosClient.delete(`/user/contact?id=${id}`);
        return result.data;
    },
    updateContact:async(data) => {
        const result = await axiosClient.put(`/user/contact?id=${data.id}`,{
            ...data,
            id:undefined
        })
        return result.data
    },
    setDefaultContact:async(id) => {
        const result = await axiosClient.patch(`/user/contact?id=${id}`);
        return result.data
    }
}

export default ContactApi