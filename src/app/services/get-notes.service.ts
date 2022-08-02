import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class GetNotesService {
  baseUrl:string='https://routeegypt.herokuapp.com/';
  constructor(private _HttpClient:HttpClient) { }
getAllNotes(data:any):Observable<any>
{
  return this._HttpClient.post(this.baseUrl+'getUserNotes',data)
}

addNotes(dataa:any):Observable<any>
{
  return this._HttpClient.post(this.baseUrl+'addNote',dataa)
}

updateNote(dataa:any):Observable<any>
{
  return this._HttpClient.put(this.baseUrl+'updateNote ',dataa)
}
deleteNotes(deletedData:any):Observable<any>
{
  let option={
    Headers:new HttpHeaders({}),
    body:{
      "NoteID":deletedData.NoteID,
      token:deletedData.token
    }
  }
  return this._HttpClient.delete(this.baseUrl+'deleteNote',option)
}
}
