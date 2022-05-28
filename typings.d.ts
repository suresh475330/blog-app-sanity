export interface Post {
    _id: string,
    _createdAt : string,
    manuscriptURL: string,
    categories:string,
    title : string,
    author : {
        name : string,
        image : {
            asset : {
                url : string
            }
        }
    },
    comments:Comment[],
    description : string,
    mainImage : {
        asset : {
          url : string,
        }
    },
    slug : {
        current : string
    },
    body : [object]
}

export interface Comment {
   _id:string,
   _createdAt:string,
   _ref:string,
   _updatedAt:string,
   approved:boolean,
   comment:string,
   email:string,
   name:string,
   post:{
       _ref:string
   }
}