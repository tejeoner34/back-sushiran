import { Request, Response } from "express"
import { sendMail } from "../adapters/mail";
import { getReservationsModel, postReservationModel } from "./model";



export async function getReservations(req: Request, res: Response){

    const timeArray = [
        '11:00',
        '11:30',
        '12:00',
        '12:30',
        '13:00',
        '13:30',
        '14:00',
        '14:30',
        '15:00',
        '15:30',
        '16:00',
        '16:30',
        '17:00',
        '17:30',
        '18:00',
        '18:30',
        '19:00',
        '19:30',
        '20:00',
        '20:30',
        '21:00',
        '21:30',
        '22:00',
        '22:30',
        '23:00',
        '23:30'
    ];

    const index = timeArray.indexOf(req.body.time);
    let availableTimes: string[];
    if(index === 0){
        availableTimes = timeArray.splice(index, 2);
    }else if(index === 1){
        availableTimes = timeArray.splice(index-1, 3);
    }else{
        availableTimes = timeArray.splice(index-2, 4);
    }
    let finalArray = [];
    const reservation = await getReservationsModel(req.body.date, req.body.number, req.body.time);
    if(reservation===null){
        
        for(let i=0; i<availableTimes.length;i++){
            finalArray.push({time:availableTimes[i], isAvailable:true})
        }
        res.json(finalArray);
    }else{
        for(let i=0; i<availableTimes.length;i++){
            const isInArray = reservation?.reservations.find((element:{time:string,numberOfPeople:string})=>element.time===availableTimes[i]&& element.numberOfPeople===req.body.number) ;
            if(isInArray===undefined){
                finalArray.push({time:availableTimes[i],isAvailable:true})
            }else{
                finalArray.push({time:availableTimes[i],isAvailable:false})
            }
        }
        res.json(finalArray)
    }
}

export async function postReservationController(req:Request, res:Response){
    const {email, people, time, date} = req.body;
    await postReservationModel(req.body);
    sendMail(email, 'Reservation details', `<h2>Details of your reservation</h2>
    <ul>
    <li>Time: ${time}</li>
    <li>People: ${people}</li>
    <li>Date: ${date}</li>
    </ul>` )
    res.json("ok");
}