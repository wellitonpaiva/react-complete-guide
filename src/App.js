import React, {Component} from 'react';
import classes from './App.css';
import Person from './Person/Person';

class App extends Component {
    
    state = {
        persons: [
            {id: 'kjhadk1u2h', name: 'Max', age: 28},
            {id: 'ln12kj3n', name: 'Manu', age: 29},
            {id: 'lknl111230', name: 'Stefany', age: 27}
       ],
       showPersons: false
    }

    deletePersonHandler = (personIndex) => {
        const persons = [...this.state.persons];
        persons.splice(personIndex,1);
        this.setState({persons: persons});
    }

    tooglePersonsHandler = () => {
        const doesShow = this.state.showPersons;
        this.setState({showPersons: !doesShow});
    }

    nameChangedHandler = (event, id) => {
        const personIndex = this.state.persons.findIndex(p => {
            return p.id === id;
        });

        const person = {
            ...this.state.persons[personIndex]
        };

        person.name = event.target.value;

        const persons = [...this.state.persons];

        persons[personIndex] = person;

        this.setState({persons: persons});
    }


    render() {

        const style = {
            backgroundColor: 'green',
            color: 'white',
            font: 'inherit',
            border: '1px solid blue',
            padding: '8px',
            cursor: 'pointer'
        };

        let persons = null;

        if (this.state.showPersons) {
            persons = (
                <div>
                    {this.state.persons.map((person, index) => {
                        return <Person  
                            click={() => this.deletePersonHandler(index)}
                            name={person.name} 
                            age={person.age}
                            key={person.id}
                            changed={(event) => this.nameChangedHandler(event, person.id)}/>
                    })}
                </div>
            );

            style.backgroundColor = 'red';
        }

        let assigned = [];
        if (this.state.persons.length <= 2) {
            assigned.push(classes.red);
        }
        if (this.state.persons.length <= 1) {
            assigned.push(classes.bold);
        }

        return (
                <div className={classes.App}>
                    <h1>Hi, I'm a React App</h1>
                    <p className={assigned.join(' ')}>This is really working!</p>
                    <button 
                        style={style}
                        onClick={this.tooglePersonsHandler}>Toogle Persons</button>
                    {persons}
                </div>
        );
    }
}

export default App;
