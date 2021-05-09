import React from 'react';
import Header from './Header';  
import Order from './Order';
import Burger from './Burger';  
import MenuAdmin from './MenuAdmin';
import sampleBurgers from '../sample-burgers';
import base from '../base';
import SignIn from './auth/SignIn';
import firebase from 'firebase/app';

class App extends React.Component {
    state = {
        burgers: {},
        order: {}
    }

    componentDidMount(){
        const params = this.props.match;

        const localStorageRef = localStorage.getItem(params.restaurantId);
        if ( localStorageRef ){
            this.setState({order: JSON.parse(localStorageRef)})
        }
        
        this.ref = base.syncState(`${params.restaurantId}/burgers`, {
            context: this,
            state: 'burgers'
        })
    }

    componentDidUpdate(){
        const { params } = this.props.match;
        localStorage.setItem(params.restaurantId, JSON.stringify(this.state.order))
    }

    componentWillUnmount(){
        base.removeBinding(this.ref)
    }

    addBurger = burger => {
        console.log('addBurger', burger);
        // делаем копию объекта state
        const burgers = {...this.state.burgers};
        // добавляем новый бургер в объект burgers
        burgers[`burger${Date.now()}`] = burger;
        // записать новый объект burgers в state
        this.setState({ burgers: burgers }); // или можно сократить запись до {burgers}
    };

    updateBurger = (key, updatedBurger) => { 
        // делаем копию объекта state
        const burgers = {...this.state.burgers};
        // обновляем нужный бургер
        burgers[key] = updatedBurger;
        // записать новый объект burgers в state
        this.setState({ burgers: burgers }); // или можно сократить запись до {burgers}
    }

    deleteBurger = (key) => {
        // делаем копию объекта state
        const burgers = {...this.state.burgers};
        // удаляем бургер 
        burgers[key] = null;
        // записать новый объект burgers в state
        this.setState({ burgers: burgers }); // или можно сократить запись до {burgers}
    }

    loadSampleBurgers = () => {
        this.setState({ burgers: sampleBurgers });
    }

    addToOrder = (key) => {
        // делаем копию объекта state
        const order = {...this.state.order};
        // добавить ключ к заказу со значением 1 или обновить текущее значение
        order[key] = order[key] + 1 || 1;
        // записать новый объект order в state
        this.setState({order: order}) // или можно сократить запись до {order}
    };

    deleteFromOrder = (key) => {
        // делаем копию объекта state
        const order = {...this.state.order};
        // удаляем бургер 
        delete order[key];
        // записать новый объект order в state
        this.setState({order: order}) // или можно сократить запись до {order} 
    }

    handleLogOut = async () => {
        await firebase.auth().signOut();
        window.location.reload();
    }

    render(){
        return(
            <SignIn>
                <div className="burger-paradise">
                    <div className="menu">
                        <Header title="Very Hot Burger" />
                        <ul className="burgers">
                            {Object.keys(this.state.burgers).map(key => {
                                return <Burger 
                                key={key} 
                                index={key} 
                                addToOrder={this.addToOrder} 
                                details={this.state.burgers[key]} 
                                />;
                            })}
                        </ul>
                    </div>
                    <Order 
                    deleteFromOrder={this.deleteFromOrder}
                    burgers={this.state.burgers} 
                    order={this.state.order}
                    />
                    <MenuAdmin 
                    addBurger={this.addBurger}
                    loadSampleBurgers={this.loadSampleBurgers} 
                    burgers={this.state.burgers}
                    updateBurger={this.updateBurger}
                    deleteBurger={this.deleteBurger}
                    handleLogOut={this.handleLogOut}
                    />
                </div>
            </SignIn>
        )
    }
}

export default App;