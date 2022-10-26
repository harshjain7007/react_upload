import React, { Component } from 'react'

export class Newsitem extends Component {



     render() {
          // destruciring 
          let { title, description, imageUrl, newsUrl, author, date, source } = this.props;
          return (
               <div>
                    <div className="card">
                         <img src={!imageUrl ? "https://c.ndtvimg.com/2022-03/esgu5ld_birbhum-violence-pti-650_650x400_23_March_22.jpg" : imageUrl} className="card-img-top" alt="..." />
                         <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" style={{zIndex:"1", left: "90%"}}>
                              {source}
                              {/* <span class="visually-hidden">unread messages</span> */}
                         </span>
                         <div className="card-body">
                              <h5 className="card-title">{title}... </h5>
                              <p className="card-text">{description}...</p>
                              <p className="card-text"><small className="text-muted">By on {author ? author : "unkown"} on {new Date(date).toGMTString()}</small></p>
                              <a href={newsUrl} rel="noreferrer" target="_blank" className="btn btn-sm btn-primary">read more</a>
                         </div>
                    </div>
               </div>
          )
     }
}

export default Newsitem