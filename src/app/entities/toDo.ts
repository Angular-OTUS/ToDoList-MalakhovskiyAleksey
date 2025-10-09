import { ToDoStatus } from "../const/to-do-status";

export class ToDo {

    constructor (
        public id : number,
        public text : string,
        public description : string,
        public status : ToDoStatus,
    )    {}
}