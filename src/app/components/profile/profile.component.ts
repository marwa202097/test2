import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GetNotesService } from 'src/app/services/get-notes.service';
import jwtDecode from "jwt-decode";
import { FormGroup, FormControl, Validators } from '@angular/forms';
declare var $:any

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {


  constructor(private _router:Router , private _GetNotesService:GetNotesService) {

  }

token :any;
decoded :any;
isLoad=false;

  //Add Note
  addNote=new FormGroup({
    title: new FormControl ("", Validators.required),
    desc:new FormControl ("",),
  })
  editNote=new FormGroup({
    titlee: new FormControl ("", Validators.required),
    descc:new FormControl ("",),
  })
//         ADD NOTES
addData(){
  console.log(this.addNote.value);
  let dataOfNote={
    title:this.addNote.value.title,
    desc:this.addNote.value.desc,
    token:this.token,
    citizenID:this.decoded._id
  }
  console.log(dataOfNote);

  this._GetNotesService.addNotes(dataOfNote).subscribe({
    next:(responsee)=>{console.log(responsee);
      if(responsee.message=='success')
      {

        $('#AddNote').modal('hide');
        this.getAllNotes();
        this.addNote.reset()
      }
    },
    error:(err)=>{console.log(err);
    }
  })

}
// /Add Note


// get alllllll notes
getAllNotes()
{
  let data = {
    token:this.token,
   userID:this.decoded._id}

   this._GetNotesService.getAllNotes(data).subscribe({
     next:(response)=>{console.log(response);

      if(response.message=='success'||'no notes found')
      {
        this.isLoad=true;
        this.AllNotes=response.Notes;
      }
      else{
        localStorage.clear();
     this._router.navigate(['/signIn'])
     this.isLoad=false;
      }

       console.log(this.AllNotes);

     },
     error:(err)=>{console.log(err);
     }
   })
}
 //****************************************************** DELETE ******************************* */
 NoteID:any
 getID(id:any){
  this.NoteID=id;
  console.log(id);

 }
deleteNote()
{
  let deletedNote={
    NoteID:this.NoteID,
    token:this.token,
  }
  this._GetNotesService.deleteNotes(deletedNote).subscribe({
    next:(response)=>{console.log(response);
      if(response.message=='deleted')
      {
        $('#DeleteNote').modal('hide');
        this.getAllNotes();
      }
    },
    error:(err)=>{console.log(err);
    }
  })
}

 //****************************************************** /DELETE ******************************* */


 //****************************************************** EDIT ******************************* */


setNoteValue()
{
 for (let index = 0; index < this.AllNotes.length; index++)
  {
    if (this.AllNotes[index]._id==this.NoteID)
     {
      console.log(this.AllNotes[index]);
      this.editNote.controls.titlee.setValue(this.AllNotes[index].title)
      this.editNote.controls.descc.setValue(this.AllNotes[index].desc)
     }

  }
}
editNoteFn()
{
  let updatedData={
    title:this.editNote.value.titlee,
    desc:this.editNote.value.descc,
    NoteID:this.NoteID,
    token:this.token
  };
  this._GetNotesService.updateNote(updatedData).subscribe({
    next:(response)=>{console.log(response);
      if(response.message=="updated")
       {
        $('#EditNote').modal('hide');
        this.getAllNotes();

       }
    },
    error:(err)=>{console.log(err);
    }
  })
}


  //****************************************************** /EDIT ******************************* */


AllNotes:any
  ngOnInit(): void {
    if(! localStorage.getItem('token'))
    {
       this._router.navigate(['/signIn'])
    }
// get  Notes
    this.token = localStorage.getItem('token');
   this.decoded = jwtDecode(this.token);
    console.log(this.decoded);
    let data = {
       token:this.token,
      userID:this.decoded._id}

      this._GetNotesService.getAllNotes(data).subscribe({
        next:(response)=>{console.log(response);
          this.AllNotes=response.Notes;
          console.log(this.AllNotes);

        },
        error:(err)=>{console.log(err);
        }
      })
      //    /get  Notes







  }


}
