import React, { Component } from 'react'


export class NewsItem extends Component {


    render() {
        let { title, description, imageUrl, newsUrl, author, date, source } = this.props;
        return (
            <div className='my-3'>
                    <div className="card">
                <div style={{display:'flex', position: 'absolute', justifyContent: 'flex-end', right: '0'}}>
                        <span class=" badge rounded-pill bg-danger" >
                            {source}
                        </span>
                    </div>
                    <img src={!imageUrl ? "https://thumbs.dreamstime.com/b/news-woodn-dice-depicting-letters-bundle-small-newspapers-leaning-left-dice-34802664.jpg" : imageUrl} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title"> {title}...</h5>
                        <p className="card-text">{description}</p>
                        <p className="card-text"><small class="text-body-secondary">By {!author ? "unknown" : author} on {new Date(date).toGMTString()}</small></p>

                        <a rel="noreferrer" href={newsUrl} target="_blank" className="btn btn-dark btn-sm">Read More</a>
                    </div>
                </div>
            </div>
        )
    }
}

export default NewsItem

