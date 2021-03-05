import React from 'react'

function WelcomeMessage () {

        return (
            <div className='modal-welcome'>
                <h1>Welcome to PropertEye</h1>
                <p>PropertEye is a property management tool created with React, Redux, ExpressJS and PostGreSQL</p>
               
                <h2>Here are some of it's key features</h2>
                <p>Every page has a searchable / filterable table in order to manage your data as easily as possible</p>
            
                <ul>
                    <li>A quick overview of your most important info</li>
                    <li>Basic income /expense report</li> 
                    <li>Detailed breakdowns of you're properties</li>
                    <li>Checkout you're current applicants and tenants</li>
                    <li>See who's moved in and who's ready to move out</li>
                    <li>Find vendors and create purchase records</li>
                </ul>     
                <h2>Some fun things to try:</h2>
                <ul>
                    <li>Create a new lease and watch you're income go up!</li>
                    <li>End a lease and see how it affects your stats</li>
                    <li>Create a purchase and see your expenses rise</li>
                    <li>Search and filter through all your properties</li>
                    <li>Click on a property to see it's details and upload a picture</li>
                </ul>

                
            </div>
        )

}

export default WelcomeMessage