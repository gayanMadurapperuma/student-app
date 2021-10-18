import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from '.././../environments/environment';


@Injectable({providedIn: 'root'})
export class AxiosService{
    constructor(){}

    async uploadFile(fileData){
        try {
            const {data} = await axios.post(environment.uploadUrl, fileData);
            return data;
        } catch (error) {
            throw new Error(error);
        }
    }
}