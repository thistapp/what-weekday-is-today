"use client"

import React, { useState } from "react"

export default function Home() {
  const [day, setDay] = useState(''); // เก็บค่าวัน
  const [month, setMonth] = useState('');  // เก็บค่าเดือน
  const [year, setYear] = useState(''); // เก็บค่าปี
  const [weekday, setWeekday] = useState(''); // เก็บค่าประเภทวัน

  const getWeekday = (day: number, month: number, year: number) => {
    const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]; // กำหนดวันในแต่ละเดือน ทั้ง 12 เดือน
    const startYear = 1900; // ค่า default ของปี 
    const startWeekday = 0; // ค่า default เป็นวันจันทร์ 

    // ปีที่มี 366 วัน || Leap year
    const leapYear = (y: number) => // กำหนดค่า y เป็น type number
      (y % 4 === 0 && y % 100 !== 0) || y % 400 === 0; // ในเงื่อนไขแรก เช็คเงื่อนไขว่า y หาร 4 หรือว่า เงื่อนไข y หาร 100 ไม่ได้ และถ้าทั้ง 2 เงื่อนไขเป็น true ให้เป็นปี Leap year || ส่วนเงื่อนไขที่ 2 ถ้า y หาร 400 ได้ ก็นับว่าเป็น Leap year

    let totalDays = 0; // สร้างตัวแปรสำหรับเก็บค่าไว้สำหรับ Leap year

    // loop ตัวเลข โดยที่ y = 1900 และ y มีค่าน้อยกว่า ปีที่กำหนด และเพิ่มไปจนถึงปีที่กำหนด
    for (let y = startYear; y < year; y++) {
      totalDays += leapYear(y) ? 366 : 365; // เช็คปีว่า ปีที่ loop มานั้น เข้าเงื่อนไขของ Leap year บ้าง ถ้าเข้าจะเป็น 366 ถ้าไม่จะเป็น 365
    }

    // loop ในส่วนของเดือน
    for (let m = 0; m < month - 1; m++) {
      totalDays += daysInMonth[m]; //การเพิ่มวันสำหรับ เดือนของแต่ละเดือน
      if (m === 1 && leapYear(year)) totalDays += 1; // เพิ่ม 1 วัน ในเดือนกุมพา สำหรับปีที่เป็น Leap year
    }

    // การเพิ่มวันที่ในเดือนปัจจุบัน หลังจาก loop จากด้านบน
    totalDays += day - 1;

    // คำนวนประเภทวัน
    const weekdayIndex = (totalDays + startWeekday) % 7; // เช็คเงื่อนไขว่า ค่าวัน ทีกำหนดมา จะอยู่ใน array ที่เท่าไร
    const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']; // ประเภทของวัน
    return weekdays[weekdayIndex]; // หลังจากที่ได้ค่า array แล้วจะเช็คประเภทของวัน
  };

  const handleSubmit = () => {
    const dayInt = parseInt(day, 10); // รับค่า วัน
    const monthInt = parseInt(month, 10); // รับค่า เดือน
    const yearInt = parseInt(year, 10); // รับค่า ปี

    if (dayInt && monthInt && yearInt) { // เงื่อนไขถ้า dayInt, monthInt, yearInt เก็บค่าเพื่อเช็คสำหรับวันว่าได้วันอะไร
      setWeekday(getWeekday(dayInt, monthInt, yearInt));
    }
  };

  return (
    <div className="p-3">
      <h1>Find the Weekday</h1>
      <div className="flex flex-col gap-2">
        <input
          type="number"
          placeholder="Day"
          value={day}
          onChange={(e) => setDay(e.target.value)}
          className=" text-black"
        />
        <input
          type="number"
          placeholder="Month"
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          className=" text-black"
        />
        <input
          type="number"
          placeholder="Year"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          className=" text-black"
        />
        <button
          onClick={handleSubmit}
        >
          Get Weekday
        </button>
        {weekday && <p>The weekday is: {weekday}</p>}
      </div>
    </div>
  );
}
