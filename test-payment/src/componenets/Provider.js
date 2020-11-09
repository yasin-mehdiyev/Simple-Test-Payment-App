import React, { Component } from 'react'

export default class Provider extends Component {
    render() {

        // Assignment of Object-Destructuring
        const { currentProvider,info,provider,changeProvider } = this.props; 

        return (
            <div>
                <div className="mt-5">
                    <span className="badge badge-secondary">{info.title}</span>

                    <ul className="list-group mt-2">
                        {
                            provider.map(provider => (
                                <li
                                    key={provider.id}
                                    className={provider.name===currentProvider?"list-group-item active":"list-group-item"}
                                    onClick={()=>changeProvider(provider)}
                                >
                                    {provider.name}
                                </li>
                            ))
                        }
                    </ul>

                </div>
            </div>
        )
    }
}
