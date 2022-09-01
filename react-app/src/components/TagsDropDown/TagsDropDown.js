import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'

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
                        <Link className='tags-link' to='/tasks'>All Tasks</Link>
                    </div>
                    <div>
                        <Link className='tags-link' to='/tags/1'>Guns</Link>
                    </div>
                    <div>
                        <Link to='/tags/2'>Explosives</Link>
                    </div>
                    <div>
                        <Link to='/tags/3'>Stealth</Link>
                    </div>
                    <div>
                        <Link to='/tags/4'>Survival</Link>
                    </div>
                    <div>
                        <Link to='/tags/5'>Medicine</Link>
                    </div>
                    <div>
                        <Link to='/tags/6'>Repairs</Link>
                    </div>
                    <div>
                        <Link to='/tags/7'>Pilot</Link>
                    </div>
                    <div>
                        <Link to='/tags/8'>Hacking</Link>
                    </div>
                    <div>
                        <Link to='/tags/9'>Hand-to-Hand</Link>
                    </div>
                </div>
            }
        </div>
    )
}

export default TagsDropDown
