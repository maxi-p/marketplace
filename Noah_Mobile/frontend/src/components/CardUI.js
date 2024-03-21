import React, { useState } from 'react';

function buildPath(route)
{
    const app_name = 'cop4331-marketplace-98e1376d9db6'
    if (process.env.NODE_ENV === 'production')
    {
    return 'https://' + app_name + '.herokuapp.com/' + route;
    }
    else
    {
    return 'http://localhost:5000/' + route;
    }
}

function CardUI()
{
    let _ud = localStorage.getItem('user_data');
    let ud = JSON.parse(_ud);
    let userId = ud.id;
    // let firstName = ud.firstName;
    // let lastName = ud.lastName;

    var card = '';
    var search = '';

    const [message,setMessage] = useState('');
    const [searchResults,setResults] = useState('');
    const [cardList,setCardList] = useState('');

    const addCard = async event => 
    {
	    event.preventDefault();

        let obj = {userId:userId,card:card.value};
        let js = JSON.stringify(obj);

        try
        {
            const response = await fetch(buildPath('api/addcard'),{method:'POST',body:js,headers:{'Content-Type': 'application/json'}});


            let txt = await response.text();
            let res = JSON.parse(txt);

            if( res.error.length > 0 )
            {
                setMessage( "API Error:" + res.error );
            }
            else
            {
                setMessage('Card has been added');
            }
        }
        catch(e)
        {
            setMessage(e.toString());
        }

	    // alert('addCard() ' + card.value);
    };

    const searchCard = async event => 
    {
        event.preventDefault();

        let obj = {userId:userId, search:search.value};
        let js = JSON.stringify(obj);

        try
        {
            const response = await fetch(buildPath('api/searchcards'), {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});


            let txt = await response.text();
            let res = JSON.parse(txt);
            let _results = res.results;
            let resultText = '';
            for( var i=0; i<_results.length; i++ )
            {
                resultText += _results[i];
                if( i < _results.length - 1 )
                {
                    resultText += ', ';
                }
            }
            setResults('Card(s) have been retrieved');
            setCardList(resultText);
        }
        catch(e)
        {
            alert(e.toString());
            setResults(e.toString());
        }

        // alert('searchCard() ' + search.value);
    };

    return(
      <div id="cardUIDiv">  <br />
       <input type="text" id="searchText" placeholder="Card To Search For" ref={(c) => search = c} />
       <button type="button" id="searchCardButton" className="buttons" onClick={searchCard}> Search Card </button><br />
       <span id="cardSearchResult">{searchResults}</span>
       <p id="cardList">{cardList}</p><br /><br />
       <input type="text" id="cardText" placeholder="Card To Add" ref={(c) => card = c} />
       <button type="button" id="addCardButton" className="buttons" onClick={addCard}> Add Card </button><br />
       <span id="cardAddResult">{message}</span>
     </div>
    );
}

export default CardUI;
