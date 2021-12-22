import React from 'react'
import './AppointmentHistory.css'
import MainLayout from '../MainLayout';
function AppointmentHistory() {
    return (
        <MainLayout>
        <div className="appointment-container">
            <h2>Appointment History</h2>

            <div class="appointment-container-box">
                <div class="appointment-box one">
                    <div className="upcoming-num">0</div>
                    <p>Upcoming Appointments</p>
                </div>

                <div class="appointment-box two">
                    <div className="pending-num">0</div>
                    <p>Pending Appointments</p>
                </div>

                <div class="appointment-box three">
                    <div className="completed-num">0</div>
                    <p>Completed Appointments</p>
                </div>

                <div class="appointment-box four">
                    <div className="cancelled-num">0</div>
                    <p>Cancelled Appointments</p>
                </div>
            </div>
            <h2>My Appointments</h2>
            <div class="appointment-input-container">
                <input type="text" placeholder="search appointment" />
            </div>

            <div class="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Doctor</th>
                            <th>Appointment Date</th>
                            <th>Mode of Appointment</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr>
                            <td>micheal</td>
                            <td>29-05-2021</td>
                            <td>Health Reasons</td>
                            <td>Pending</td>
                            <td>Cancel</td>
                        </tr>

                        <tr>
                            <td>micheal</td>
                            <td>29-05-2021</td>
                            <td>Health Reasons</td>
                            <td>Pending</td>
                            <td>Cancel</td>
                        </tr>

                        <tr>
                            <td>micheal</td>
                            <td>29-05-2021</td>
                            <td>Health Reasons</td>
                            <td>Pending</td>
                            <td>Cancel</td>
                        </tr>

                        <tr>
                            <td>micheal</td>
                            <td>29-05-2021</td>
                            <td>Health Reasons</td>
                            <td>Pending</td>
                            <td>Cancel</td>
                        </tr>

                        <tr>
                            <td>micheal</td>
                            <td>29-05-2021</td>
                            <td>Health Reasons</td>
                            <td>Pending</td>
                            <td>Cancel</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        </MainLayout>
    )
}

export default AppointmentHistory
