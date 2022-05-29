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

        },
        slug : {
            _type:string,
            current:string
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

export interface Author {
        author: [
            {
                bio: [
                    {
                        _key: string,
                        _type: string,
                        children: [
                            {
                                _key: string,
                                _type: string,
                                marks: [],
                                text: string
                            }
                        ],
                        markDefs: [],
                        style: string,
                    }
                ],
                image: {
                    _type: string,
                    asset: {
                        _ref: string,
                        _type: string,
                    }
                },
                name: string
            }
        ]

}