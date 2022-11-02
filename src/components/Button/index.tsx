import React, { useEffect, useState } from 'react'
import styles from './styles.module.css'

interface ButtonProps {
  arrayStudents: string[];
}
let oldId = -1
export function Button({arrayStudents}: ButtonProps) {
  const [hasClicked, setHasClicked] = useState<boolean>(false)
  const [studentName, setStudentName] = useState<string>('')
  
  
  function sortStudentName() {
    let randomId = Math.floor(Math.random() * arrayStudents.length)
    let studentNameRandom = arrayStudents[randomId === arrayStudents.length ? randomId -1 : randomId]
    let studentNameRandomOld = arrayStudents[oldId]
    oldId = randomId
    console.log(studentNameRandom);
    
    return studentNameRandom === studentNameRandomOld ? sortStudentName() : studentNameRandom 
  }

  function waitToSort() {
    let count = 3
    const interval = setInterval(() => {
      setStudentName(`Sorting in ${count--}`)
    }, 700)

    setTimeout(() => {
      clearInterval(interval)
      setHasClicked(true)
    }, 3000)
  }

  useEffect(() => {
    if (hasClicked) {
      setStudentName(sortStudentName())
      setHasClicked(false)
    }
  })
  return (
    <div className={styles.container}>
      <input 
        type="text"
        readOnly
        className={styles.studentName}
        placeholder="Click the button to sort a name"
        value={studentName}
      />
      <button
        className={styles.btn}
        onClick={() => waitToSort()}
      >
        Sort student
      </button>
    </div>
  )
}