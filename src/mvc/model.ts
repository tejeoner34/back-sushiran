import { MongoClient, ObjectId } from "mongodb";
import {URI} from "../config";


const client: MongoClient = new MongoClient(URI);

interface reservation{
    time:string,
    people:number,
    email:string,
    date:string
}

export async function getReservationsModel(date:string, number:number, time:string){
    try{
        await client.connect();
        const db= client.db('reservations')
        const reservations = db.collection('reservations');
        return await reservations.findOne({date});
    }catch (err){
        console.log(err)
    }finally{
        await client.close();
    }
}

export async function getAvailabilityModel(date:object){
    try{
        await client.connect();
        const db= client.db('reservations')
        const reservations = db.collection('reservations');
        return await reservations.findOne({date});
    }catch (err){
        console.log(err)
    }finally{
        await client.close();
    }
}


export async function postReservationModel(reservation:reservation){
    const {date} = reservation;
    const reservationToAdd = {
        time: reservation.time,
        numberOfPeople: reservation.people,
        date,
        email: reservation.email
    }
    const reservationToAddWhenDateNotExists ={
        date,
        reservations:[reservationToAdd]
    }
    try{
        await client.connect();
        const db= client.db('reservations')
        const reservations = db.collection('reservations');
        const finded = await reservations.findOne({date});
        if(finded === null){
            await reservations.insertOne(reservationToAddWhenDateNotExists);
        }else{
           await reservations.updateOne({date}, {$push:{reservations:reservationToAdd}} ,{upsert:false})
        }
        // const insertedReservation = await reservations.insertOne(reservation);
        // return await reservations.findOne({"_id": insertedReservation.insertedId})
    }catch (err){
        console.log(err)
    }finally{
        await client.close();
    }
}

