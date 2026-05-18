const students = [
    {
        id: 101, name: "Alice Johnson", age: 20,
        subjects: ["Math", "Physics", "Chemistry"],
        scores: [85, 90, 78]
    },
    {
        id: 102, name: "Bob Smith", age: 21,
        subjects: ["Math", "Physics", "Chemistry"],
        scores: [92, 88, 95]
    },
    {
        id: 103, name: "Charlie Brown", age: 19,
        subjects: ["Math", "Physics", "Biology"],
        scores: [78, 82, 85]
    },
    {
        id: 104, name: "Diana Prince", age: 20,
        subjects: ["Math", "Chemistry", "Biology"],
        scores: [95, 92, 89]
    },
    {
        id: 105, name: "Eve Davis", age: 22,
        subjects: ["Physics", "Chemistry", "Biology"],
        scores: [88, 85, 90]
    }
];

const addStudent = () => {
    let id = document.getElementById("id").value;
    let name = document.getElementById("name").value;
    let age = document.getElementById("age").value;
    let subjects = document.getElementById("subjects").value.split(",").map(subject => subject.trim());
    let scores = document.getElementById("scores").value.split(",").map(score => Number(score.trim()));

    if (studentExists(id)) {
        alert("Student ID already exists");
        return;
    }
    if (age < 18 || age > 30) {
        alert("Age must be between 18-30");
        return;
    }
    if (subjects.length < 1 || subjects.length > 5) {
        alert("Minimum 1 and maximum 5 subjects are allowed");
        return;
    }
    if (scores.some(score => score < 0 || score > 100)) {
        alert("Scores must be between 0-100");
        return;
    }

    for (let sub of subjects) {
        if (!validSubjects.has(sub)) {
            alert(`Invalid Subject: ${sub}`);
            return;
        }
    }
    subjects = [...new Set(subjects)];

    let newStudent = { id, name, age, subjects, scores }
    students.push(newStudent);

    alert("Student Added Successfully");
    renderStudents();
}


const studentExists = (id) => {
    return students.some(s => s.id === Number(id));
}

const validSubjects = new Set([
    "Math",
    "Physics",
    "Chemistry",
    "Biology",
    "English",
    "Computer"
]);


const renderStudents = () => {
    const tbody = document.getElementById("studentTable");
    tbody.innerHTML = "";

    let search = document.getElementById("searchName").value.toLowerCase();
    let gradeFilter = document.getElementById("gradeFilter").value;
    let subjectFilter = document.getElementById("subjectFilter").value;

    let filteredStudents = students.filter(student => {
        let avg = calculateAvg(student.scores);
        let grade = getGrade(avg);

        return (student.name.toLowerCase().includes(search) &&
            (gradeFilter === "" || grade === gradeFilter) && (subjectFilter === "" || student.subjects.includes(subjectFilter))
        );
    });

    filteredStudents.forEach(student => {
        let avg = calculateAvg(student.scores).toFixed(2);
        let grade = getGrade(avg);

        tbody.innerHTML += `
            <tr>
                <td>${student.id}</td>
                <td>${student.name}</td>
                <td>${student.age}</td>
                <td>${student.subjects.join(", ")}</td>
                <td>${student.scores.join(", ")}</td>
                <td>${avg}</td>
                <td class="grade-${grade}">
                    ${grade}
                </td>
                <td>
                    <button onclick="deleteStudent(${student.id})">
                        Delete
                    </button>
                </td>
            </tr>
        `;
    });
    if (typeof updateDashboard === "function") updateDashboard();
    if (typeof generateLeaderboard === "function") generateLeaderboard();
}

const viewSubjectFilter = () => {
    let select = document.getElementById("subjectFilter");
    let uniqueSub = uniqueSubjects()
    uniqueSub.forEach(subject => {
        select.innerHTML += `<option value="${subject}">${subject}</option>`;
    });
}

function updateDashboard() {
    document.getElementById("totalStudents").innerText = students.length;
    let scores = students.flatMap(student => student.scores);
    let avg = calculateAvg(scores).toFixed(2);
    document.getElementById("classAverage").innerText = avg;

    let distribution = "";

    gradeMap().forEach((count, grade) => {
        distribution += `${grade}: ${count} `;
    });

    document.getElementById("gradeDistribution").innerText = distribution;
    document.getElementById("subjectsOffered").innerText = [...uniqueSubjects()].join(", ");
}

const scoredAbove = students.filter(s => {
    for (let score of s.scores) {
        if (score <= 85) return false;
    }
    return true;
})
console.log("Above 85 in all subjects: ", scoredAbove);


const calculateAvg = (scores) => {
    return scores.reduce((a, b) => a + b, 0) / scores.length;
}

const sortedByAvg = students.toSorted((a, b) => {
    return calculateAvg(b.scores) - calculateAvg(a.scores);
})
console.log("Sorted by average score in decreasing order: ", sortedByAvg);


const finByAge = students.filter(s => {
    return s.age >= 19 && s.age <= 21;
})
console.log("Find by age: ", finByAge);


const physicsStudent = students.filter(s => {
    return s.subjects.includes("Physics");
})
console.log("Physics Students: ", physicsStudent)


const nameAndAvg = students.map(s => {
    return {
        name: s.name,
        average: calculateAvg(s.scores)
    }
})
console.log("Student name and average: ", nameAndAvg)


const getGrade = (avg) => {
    avg = Number(avg);
    if (avg >= 90) return "A";
    if (avg >= 80 && avg <= 89) return "B";
    if (avg >= 70 && avg <= 79) return "C";
    if (avg >= 60 && avg <= 69) return "D";
    return "F";
}

const addGrade = students.map(s => {
    return {
        ...s,
        grade: getGrade(calculateAvg(s.scores))
    }
})
console.log("Student with grade: ", addGrade);


const allSubjects = students.flatMap(s => {
    return s.subjects
})
console.log("Flatten all subjects: ", allSubjects);


const allScores = students.flatMap(s => s.scores);
const classAvg = allScores.reduce((a, b) => a + b, 0) / allScores.length;
console.log("Overall class average: ", classAvg);


const highestScore = () => {
    let res = {};

    students.forEach(std => {
        std.subjects.forEach((sub, i) => {
            let score = std.scores[i];

            if (!res[sub] || score > res[sub]) {
                res[sub] = score;
            }
        })
    })
    return res;
}
console.log("Highest score in each subject: ", highestScore());


const highestOverallScore = students.reduce((std1, std2) => {
    const avg1 = calculateAvg(std1.scores);
    const avg2 = calculateAvg(std2.scores);

    return avg1 > avg2 ? std1 : std2;
});
console.log("Student with highest overall average: ", highestOverallScore);


const findStudent = (id) => {
    return students.find(s => s.id === id);
}
console.log("Student By Id: ", findStudent(102));


const indexOfStudent = (name) => {
    return students.findIndex(s => s.name === name);
}
console.log("Index of Student: ", indexOfStudent("Diana Prince"));



const subjectScoreMap = () => {
    const subMap = new Map();

    students.forEach((student) => {
        student.subjects.forEach((sub, i) => {
            const score = student.scores[i];

            if (!subMap.has(sub)) {
                subMap.set(sub, []);
            }
            subMap.get(sub).push(score);
        })
    })
    return subMap;
}
console.log("Subject score map: ", subjectScoreMap());


const gradeMap = () => {
    const map = new Map();

    students.forEach(student => {
        const avg = calculateAvg(student.scores);
        const grade = getGrade(avg);

        if (!map.has(grade)) {
            map.set(grade, 0);
        }
        map.set(grade, map.get(grade) + 1);
    })
    return map;
}
console.log("Grade Distribution Map: ", gradeMap());


const subjectMap = () => {
    const subMap = new Map();

    students.forEach(student => {
        student.subjects.forEach((subject, i) => {
            const score = student.scores[i];

            if (!subMap.has(subject)) {
                subMap.set(subject, []);
            }
            subMap.get(subject).push(score);
        }) 
    })

    for (let [sub, scores] of subMap) {
        subMap.set(sub, {
            avg: calculateAvg(scores),
            high: Math.max(...scores),
            low: Math.min(...scores),
            count: scores.length
        })
    }
    return subMap;
}
console.log("Subject Statistics Map: ", subjectMap())




const uniqueSubjects = () => {
    let res = new Set(students.flatMap(s => s.subjects));
    return res;
}
console.log("Unique Subjects:", uniqueSubjects());


const uniqueAges = () => {
    let res = new Set(students.map(s => s.age));
    return res;
}
console.log("Unique Ages:", uniqueAges());


const uniqueScores = () => {
    let res = new Set(students.flatMap(s => s.scores));
    return res;
}
console.log("Unique Scores:", uniqueScores());


function deleteStudent(id) {
    let index = students.findIndex(s => s.id === id);
    if (index !== -1) {
        students.splice(index, 1);
        renderStudents();
    }
}

const hasScoreBelow70 = students.some(s => s.scores.some(score => score < 70));
console.log("Any student scored below 70:", hasScoreBelow70);

const allPassed = students.every(s => s.scores.every(score => score >= 60));
console.log("All students passed (>= 60):", allPassed);

const studentPerformanceMap = new Map();
students.forEach(s => studentPerformanceMap.set(s.id, s));

function getUnion(set1, set2) {
    return new Set([...set1, ...set2]);
}
function getIntersection(set1, set2) {
    return new Set([...set1].filter(x => set2.has(x)));
}
function getDifference(set1, set2) {
    return new Set([...set1].filter(x => !set2.has(x)));
}
function getSymmetricDifference(set1, set2) {
    return new Set([...getDifference(set1, set2), ...getDifference(set2, set1)]);
}


let aliceSubjects = new Set(students[0].subjects);
let bobSubjects = new Set(students[1].subjects);
console.log("Union of Alice and Bob subjects:", getUnion(aliceSubjects, bobSubjects));


const studentsWithUniqueCombinations = () => {
    let combinations = new Map();
    students.forEach(s => {
        let res = [...s.subjects].sort().join(",");
        if (!combinations.has(res)) {
            combinations.set(res, []);
        }
        combinations.get(res).push(s);
    });
    let uniqueComboStudents = [];
    combinations.forEach(group => {
        if (group.length === 1) uniqueComboStudents.push(group[0]);
    });
    return uniqueComboStudents;
}
console.log("Students with unique subject combinations:", studentsWithUniqueCombinations());

const mergeStudents = (arr1, arr2) => {
    let combined = [...arr1, ...arr2];
    let seen = new Set();
    let mergedMap = new Map();

    combined.forEach(s => {
        if (!seen.has(s.id)) {
            seen.add(s.id);
            mergedMap.set(s.id, s);
        } else {
            let existing = mergedMap.get(s.id);
            if (calculateAvg(s.scores) > calculateAvg(existing.scores)) {
                mergedMap.set(s.id, s);
            }
        }
    });
    return Array.from(mergedMap.values());
}
console.log("Merged Arrays Deduplication:", mergeStudents(
    [{ id: 101, name: "Alice", scores: [85, 90], subjects: ["Math", "Physics"], age: 20 }],
    [{ id: 101, name: "Alice", scores: [90, 95], subjects: ["Math", "Physics"], age: 20 }, { id: 106, name: "Frank", scores: [80, 85], subjects: ["Chemistry", "Biology"], age: 22 }]
));


function generateLeaderboard() {
    let rankedStudents = students.map(s => {
        return {
            id: s.id, name: s.name,
            avg: calculateAvg(s.scores),
            grade: getGrade(calculateAvg(s.scores))
        };
    }).sort((a, b) => b.avg - a.avg);

    let rankMap = new Map();
    let uniqueAvgs = new Set();
    rankedStudents.forEach(s => uniqueAvgs.add(s.avg));
    
    let sortedAvgs = [...uniqueAvgs].sort((a, b) => b - a);
    sortedAvgs.forEach((avg, index) => rankMap.set(avg, index + 1));

    let leaderboardDiv = document.getElementById("leaderboard");
    if (leaderboardDiv) {
        leaderboardDiv.innerHTML = "";
        rankedStudents.forEach(s => {
            let rank = rankMap.get(s.avg);
            leaderboardDiv.innerHTML += `
                <div class="leaderboard-item">
                    <span><strong>Rank ${rank}:</strong> ${s.name}</span>
                    <span>Average: ${s.avg.toFixed(2)} | Grade: <span class="grade-${s.grade}">${s.grade}</span></span>
                </div>
            `;
        });
    }
}

generateLeaderboard();


const analyzeSubjectPerformance = () => {
    let analysisMap = new Map();
    uniqueSubjects().forEach(subject => {
        let enrolled = students.filter(s => s.subjects.includes(subject));
        let subjectScores = enrolled.map(s => {
            let index = s.subjects.indexOf(subject);
            return { name: s.name, score: s.scores[index] };
        });
        
        let avg = subjectScores.reduce((acc, curr) => acc + curr.score, 0) / (subjectScores.length || 1);
        let top3 = [...subjectScores].sort((a, b) => b.score - a.score).slice(0, 3);
        let aboveAvg = subjectScores.filter(s => s.score > avg).length;
        
        analysisMap.set(subject, { average: avg.toFixed(2), topPerformers: top3, aboveAverageCount: aboveAvg });
    });
    return analysisMap;
}
console.log("Subject Performance Analysis:", analyzeSubjectPerformance());


const groupStudents = () => {
    let byGrade = new Map();
    let byAge = new Map();
    let bySubjectCount = new Map();

    students.forEach(s => {
        let grade = getGrade(calculateAvg(s.scores));
        if (!byGrade.has(grade)) {
            byGrade.set(grade, []);
        }
        byGrade.get(grade).push(s);
        
        if (!byAge.has(s.age)) {
            byAge.set(s.age, []);
        }
        byAge.get(s.age).push(s);
        
        let subCount = s.subjects.length;
        if (!bySubjectCount.has(subCount)) {
            bySubjectCount.set(subCount, []);
        }
        bySubjectCount.get(subCount).push(s);
    });
    return { byGrade, byAge, bySubjectCount };
}
console.log("Grouped Students:", groupStudents());


viewSubjectFilter();
renderStudents();