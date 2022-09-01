import { useState } from 'react'
import { NavLink } from 'react-router-dom'

function TagsDropDown() {
    const [showDropDown, setShowDropDown] = useState(false)

    return (
        <div
            id='nav-tasks'
            onMouseEnter={() => setShowDropDown(true)}
            onMouseLeave={() => setShowDropDown(false)}
        // style={{ 'maxWidth': '50px' }}
        >
            <NavLink to='/tasks'>Tasks</NavLink>
            {showDropDown &&
                <div
                    id='tag-drop-down-container'
                    style={{
                        'position': 'absolute',
                        // 'top': '55px',
                        // 'left': '-1px',
                        'backgroundColor': 'var(--dark-blue)',
                        'border': '1px solid black' }}>
                    <div>
                        <NavLink className='tags-link' to='/tasks'>All Tasks</NavLink>
                    </div>
                    <div>
                        <NavLink className='tags-link' to='/tags/1'>Guns</NavLink>
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
                </div>
            }
        </div>
    )
}

export default TagsDropDown
