import { useState } from 'react'
import { NavLink } from 'react-router-dom'

function TagsDropDown() {
    const [showDropDown, setShowDropDown] = useState(false)

    return (
        <div
        onMouseEnter={() => setShowDropDown(true)}
        onMouseLeave={() => setShowDropDown(false)}
        >
            <div>Tags</div>
            {showDropDown &&
                <div style={{ 'position': 'absolute', 'backgroundColor': 'white', 'border': '1px solid black' }}>
                    <div>
                        <NavLink to='/tags/1'>Guns</NavLink>
                    </div>
                    <div>
                        <NavLink to='/tags/2'>Explosives</NavLink>
                    </div>
                    <div>
                        <NavLink to='/tags/3'>Stealth</NavLink>
                    </div>
                    <div>
                        <NavLink to='/tags/4'>Survival</NavLink>
                    </div>
                    <div>
                        <NavLink to='/tags/5'>Medicine</NavLink>
                    </div>
                    <div>
                        <NavLink to='/tags/6'>Repairs</NavLink>
                    </div>
                    <div>
                        <NavLink to='/tags/7'>Pilot</NavLink>
                    </div>
                    <div>
                        <NavLink to='/tags/8'>Hacking</NavLink>
                    </div>
                    <div>
                        <NavLink to='/tags/9'>Hand-to-Hand</NavLink>
                    </div>
                    <div>
                        <NavLink to='/tags/10'>Charisma</NavLink>
                    </div>
                </div>
            }
        </div>
    )
}

export default TagsDropDown
