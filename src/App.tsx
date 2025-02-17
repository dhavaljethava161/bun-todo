import React, { useState } from 'react';
import './App.css'
import moment from 'moment';

function App() {

  const [schedule, setSchedule] = useState<{ description: string, date: string, time: string }[]>([])

  return (
    <>
      <AddScheduleForm schedule={schedule} setSchedule={setSchedule} />
      <Table key={"table"} schedule={schedule} />
    </>
  )
}

const AddScheduleForm: React.FC<{
  schedule: { description: string, date: string, time: string }[],
  setSchedule: React.Dispatch<React.SetStateAction<{ description: string; date: string; time: string; }[]>>
}> = ({ schedule, setSchedule }) => {

  const [formData, setFormData] = useState({ description: "", date: "", time: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.description || !formData.date || !formData.time) return;
    const newRow = {
      id: schedule.length + 1,
      description: formData.description,
      date: formData.date,
      time: formData.time,
    };

    setSchedule([...schedule, newRow].sort((a, b) => {
      const dateTimeA = moment(`${a.date} ${a.time}`, "YYYY-MM-DD HH:mm").valueOf();
      const dateTimeB = moment(`${b.date} ${b.time}`, "YYYY-MM-DD HH:mm").valueOf();
      return dateTimeA - dateTimeB;
    }));
    setFormData({ description: "", date: "", time: "" });
  };
  return (
    <form onSubmit={handleSubmit} className="mb-4 p-4 border rounded bg-gray-600">
      <div className="flex gap-4">
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          className="border p-2 rounded w-full"
          required
        />
        <input
          type="date"
          name="date"
          placeholder="Enter date"
          value={formData.date}
          onChange={handleChange}
          className="border p-2 rounded w-full"
          required
        />
        <input
          type="time"
          name="time"
          placeholder="Enter time"
          value={formData.time}
          onChange={handleChange}
          className="border p-2 rounded w-full"
          required
        />
      </div>
      <button type="submit" className="mt-3 bg-blue-500 text-white px-4 py-2 rounded">
        Add Row
      </button>
    </form>
  )
}

const Table = ({ schedule }: { schedule: { description: string, date: string, time: string }[] }) => {
  return (
    <table border={1} className="border-collapse w-full text-left">
      <thead>
        <tr className="bg-gray-500">
          <th className="p-2 text-center border">Description</th>
          <th className="p-2 text-center border">Date and Time</th>
        </tr>
      </thead>
      <tbody>
        {schedule.map((row, index) => (
          <tr key={index} className="border">
            <td className="p-2 text-center border">{row.description}</td>
            <td className="p-2 text-center border">{moment(`${row.date} ${row.time}`, 'YYYY-MM-DD HH:mm').format("DD-MM-YYYY hh:mm A")}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default App
