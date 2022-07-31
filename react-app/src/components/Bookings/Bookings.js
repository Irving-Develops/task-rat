import { useSelector } from 'react-redux';
import BookedTasks from './BookedTasks'

function Bookings({reviewArr, bookings, selectedJobButton}) {
    const sessionUser = useSelector(state => state.session.user)
    let completedBookings;
    let currentBookings;

    if(bookings && sessionUser) {
        completedBookings = Object.values(bookings).filter(booking => booking.tasker_id === sessionUser.id && booking.completed);
        currentBookings = Object.values(bookings).filter(booking => booking.tasker_id === sessionUser.id && !booking.completed);
    }

    return (
        <div id='show-jobs'>
          <div id='current-job-container' style={{ display: selectedJobButton.includes(0) ? 'grid' : 'none' }}>
            {currentBookings && currentBookings.length > 0 ? currentBookings.map(booking => {
              return (
                <div key={booking.id} className='task-scroll-divs'>
                  <BookedTasks taskId={booking.task_id} booking={booking}/>
                </div>
              );
            }) : <p>You currently don't have any jobs in this section.</p>}
          </div>
          <div id='completed-job-container' style={{ display: selectedJobButton.includes(1) ? 'grid' : 'none' }}>
            {completedBookings && completedBookings.length > 0 ? completedBookings.map(booking => {
              return (
                <div key={booking.id} className='task-scroll-divs'>
                  <BookedTasks taskId={booking.task_id} booking={booking} reviewArr={reviewArr}/>
                </div>
              );
            }) : <p>You currently don't have any jobs in this section.</p>}
          </div>
        </div>
    )
}

export default Bookings;
