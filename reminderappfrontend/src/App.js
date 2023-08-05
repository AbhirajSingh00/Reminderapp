import "./App.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import DateTimePicker from "react-datetime-picker";

const App = () => {
  const [reminderMsg, setReminderMsg] = useState();
  const [remindAt, setRemindAt] = useState();
  const [reminderList, setReminderList] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:9000/getAllReminder").then((res) => {
      setReminderList(res.data);
    }).catch((e) => {
      console.log(e.response.data);

    })
  }, [])

  const change = (e) => {
    setReminderMsg(e.target.value);
  }

  const addReminder = () => {
    axios.post("http://localhost:9000/addReminder", { reminderMsg, remindAt }).then((res) => {
      setReminderList(res.data);
      setReminderMsg();
      remindAt();
    })

  }

  const deleteReminder = () => {

  }

  return (
    <>
      <div className="homepage">
        <div className="homepage_header">
          <h1>Remind Me🙋</h1>
          <input
            type="text"
            placeholder="Enter Reminder Notes...."
            name="reminder"
            value={reminderMsg}
            onChange={change}
          />
          <DateTimePicker
            value={remindAt}
            onChange={setRemindAt}
            minDate={new Date()}
            minutePlaceholder="mm"
            hourPlaceholder="hh"
            dayPlaceholder="DD"
            monthPlaceholder="MM"
            yearPlaceholder="YYYY"
          />
          <div onClick={addReminder}>Add Reminder</div>
        </div>
        <div className="homepage_body">
          <div className="reminder_card">
            <h2>Reminder Note</h2>
            <h3>Remind Me at:</h3>
            <p>28/07/2023 @ 8AM</p>
            <div className="button" onClick={deleteReminder}>Delete</div>
          </div>
        </div>

        <div className="homepage_body">
          {
            reminderList.map(reminder => (
              <div className="reminder_card" key={reminder.id}>
                <h2>{reminder.reminderMsg}</h2>
                <h3>Remind Me at:</h3>
                <p>{String(new Date(reminder.remindAt.tolocaleString(undefined, { timezone: "Asia/Kolkata" })))}</p>
                <div className="button" onClick={deleteReminder}>Delete</div>
              </div>
            ))
          }

        </div>

        <div className="homepage_body">
          <div className="reminder_card">
            <h2>Reminder Note</h2>
            <h3>Remind Me at:</h3>
            <p>28/07/2023 @ 8AM</p>
            <div className="button" onClick={deleteReminder}>Delete</div>
          </div>
        </div>

        <div className="homepage_body">
          <div className="reminder_card">
            <h2>Reminder Note</h2>
            <h3>Remind Me at:</h3>
            <p>28/07/2023 @ 8AM</p>
            <div className="button" onClick={deleteReminder}>Delete</div>
          </div>
        </div>


      </div>

    </>
  )

}

export default App;