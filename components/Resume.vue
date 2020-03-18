<template>
    <div style="font-family: Arial;">
        <!-- General Information -->
        <v-row>
            <v-col
                :cols="12"
                :lg="6"
                :md="6"
                :sm="8"
                :xs="12"
            >
                <h1>Arik Dicks</h1>
                <h3>Software Developer</h3>
                Entry-level
            </v-col>
            <v-col
                :class="($vuetify.breakpoint.name != 'xs')? 'text-right' : ''"
                :cols="6"
                :lg="6"
                :md="6"
                :sm="4"
                :xs="4"
            >
                arikd.dev@gmail.com<br>
                604-828-7579<br>
                Vancouver BC<br>
                <a href="https://www.linkedin.com/in/arik-dicks-630855132">Linkedin</a><br>
                <a href="https://www.github.com/Arik13">Github</a><br>

            </v-col>
        </v-row>
        <v-divider /><br>

        <!-- Technical skills -->
        <h3>Technical Skills</h3>
        <v-row>
            <v-col
                :cols="6"
                :lg="4"
                :md="4"
                :sm="4"
                :xs="6"
            >
                <h4>IDE's</h4>
                <ul>
                    <li v-for="(IDE, i) in IDEs" :key="i">{{IDE}}</li>
                </ul><br>
                <h4>Web</h4>
                <ul>
                    <li v-for="(webSkill, i) in webSkills" :key="i">{{webSkill}}</li>
                </ul>
            </v-col>
            <v-col
                :cols="6"
                :lg="4"
                :md="4"
                :sm="4"
                :xs="6"
            >
                <h4>Languages</h4>
                <ul>
                    <li v-for="(language, i) in languages" :key="i">{{language}}</li>
                </ul><br>
                <h4>Databases</h4>
                <ul>
                    <li v-for="(dbSkill, i) in dbSkills" :key="i">{{dbSkill}}</li>
                </ul>
            </v-col>
            <v-col
                :cols="12"
                :lg="4"
                :md="4"
                :sm="12"
                :xs="12"
            >
                <h4>Other</h4>
                <ul>
                    <li v-for="(other, i) in others" :key="i">{{other}}</li>
                </ul><br>
                <h4>Multimedia</h4>
                <ul>
                    <li v-for="(skill, i) in multiMediaSkills" :key="i">{{skill}}</li>
                </ul>
            </v-col>
        </v-row>
        <v-divider /><br>


        <!-- Education -->
        <h3>Education</h3>
        <v-row>
            <v-col
                :cols="12"
                :lg="6"
                :md="6"
                :sm="6"
                :xs="12"
            >
                <u><h4>Associate of Science (Physics)</h4></u>
                <h5 style="font-size: 80%">Langara College (1-year completed)</h5>
                <ul>
                    <li v-for="(course, i) in courses" :key="i"> {{course.courseName + " ("+ course.grade + ")"}}</li>
                </ul>
            </v-col>
            <v-col
                :cols="12"
                :lg="6"
                :md="6"
                :sm="6"
                :xs="12"
            >
                <u><h4>Udemy Online Courses</h4></u>
                <ul>
                    <li v-for="(course, i) in udemyCourses" :key="i"> {{course}}</li>
                </ul>
            </v-col>
        </v-row>
        <v-divider /><br>

        <!-- Books -->
        <h3>Books Read</h3>
        <v-row>
            <v-col>
                <ul>
                    <li v-for="(book, i) in books" :key="i">{{book}}</li>
                </ul>
            </v-col>
        </v-row>
        <v-divider /><br>

        <!-- Projects -->
        <h3>Projects</h3>
        <v-row style="font-size:11pt;font-family:Consolas,sans-serif;">
            <v-col
                :cols="12"
                :lg="4"
                :md="6"
                :sm="12"
                :xs="12"
            >

                <h4>Punch In</h4>
                <p>A web app that lets Employees connect with an Employer, so they can clock into jobs created and assigned to them by their Employer.</p>


                <span style="color:#569cd6;">let </span>
                <span style="color:#9cdcfe;">PunchInDetails </span>
                <span style="color:#ffffff;">= {</span><br>

                <span style="color:#9cdcfe; margin-left: 25px;">IDE: </span>
                <span style="color:#CE9178;">'VSCode'</span>
                <span style="color:#ffffff;">, </span><br>

                <span style="color:#9cdcfe; margin-left: 25px;">frontEnd: </span>
                <span style="color:#CE9178;">'Vue.js'</span>
                <span style="color:#ffffff;">, </span><br>

                <span style="color:#9cdcfe; margin-left: 25px;">backend: </span>
                <span style="color:#CE9178;">'Node.js/Express.js'</span>
                <span style="color:#ffffff;">, </span><br>

                <span style="color:#9cdcfe; margin-left: 25px;">database: </span>
                <span style="color:#CE9178;">'MongoDB/Mongoose'</span>
                <span style="color:#ffffff;">, </span><br>

                <span style="color:#9cdcfe; margin-left: 25px;">serverGitHubLink: </span>
                <span style="color:#CE9178;">'</span>
                <a href="https://github.com/Arik13/punchin-server.git">Server Link</a>
                <span style="color:#CE9178;">'</span>
                <span style="color:#ffffff;">, </span><br>

                <span style="color:#9cdcfe; margin-left: 25px;">clientGitHubLink: </span>
                <span style="color:#CE9178;">'</span>
                <a href="https://github.com/Arik13/punchin-client.git">Client Link</a>
                <span style="color:#CE9178;">'</span><br>
                <span style="color:#ffffff;">} </span>
            </v-col>
            <v-col
                :cols="12"
                :lg="4"
                :md="6"
                :sm="12"
                :xs="12"
            >

                <h4>Grapher</h4>
                <p>A C++ OpenGL program that graphs multi-variable math functions in 3D.</p>


                <span style="color:#569cd6;">struct </span>
                <span style="color:#9cdcfe;">GrapherDetails </span>
                <span style="color:#ffffff;">{</span><br>

                <span style="color:#ffffff; margin-left: 25px;">std::</span>
                <span style="color:#4ec9b0;">string </span>
                <span style="color:#ffffff;">IDE = </span>
                <span style="color:#CE9178;">'Visual Studio'</span>
                <span style="color:#ffffff;">; </span><br>

                <span style="color:#ffffff; margin-left: 25px;">std::</span>
                <span style="color:#4ec9b0;">string </span>
                <span style="color:#ffffff;">language = </span>
                <span style="color:#CE9178;">'C++'</span>
                <span style="color:#ffffff;">; </span><br>

                <span style="color:#ffffff; margin-left: 25px;">std::</span>
                <span style="color:#4ec9b0;">string </span>
                <span style="color:#ffffff;">guiFramework = </span>
                <span style="color:#CE9178;">'QT'</span>
                <span style="color:#ffffff;">; </span><br>

                <span style="color:#ffffff; margin-left: 25px;">std::</span>
                <span style="color:#4ec9b0;">string </span>
                <span style="color:#ffffff;">graphicsAPI = </span>
                <span style="color:#CE9178;">'OpenGL'</span>
                <span style="color:#ffffff;">; </span><br>

                <span style="color:#ffffff; margin-left: 25px;">std::</span>
                <span style="color:#4ec9b0;">string </span>
                <span style="color:#ffffff;">githubLink = </span>
                <span style="color:#CE9178;">'</span>
                <a href="https://github.com/Arik13/Viewer3D.git">Github</a>
                <span style="color:#CE9178;">'</span>
                <span style="color:#ffffff;">;</span><br>
                <span style="color:#ffffff;">} </span>
            </v-col>
            <v-col
                :cols="12"
                :lg="4"
                :md="6"
                :sm="12"
                :xs="12"
            >

                <h4>Viewer3D</h4>
                <p>A Java based 3D graphics program, with a rendering pipeline built completely from scratch. No OpenGL or DirectX required.</p>

                <div style="background-color: white; padding: 10px 10px;">
                <span style="color:#9f3f7f;"><b>public class </b></span>
                <span style="color:#1e1e1e;">Viewer3D_Details {</span><br>

                <span style="color:#9f3f7f; margin-left: 25px;">private </span>
                <span style="color:#1e1e1e;">String </span>
                <span style="color:#441fff;">IDE </span>
                <span style="color:#1e1e1e;">= </span>
                <span style="color:#441fff;">"NetBeans"</span>
                <span style="color:#1e1e1e;">;</span><br>

                <span style="color:#9f3f7f; margin-left: 25px;">private </span>
                <span style="color:#1e1e1e;">String </span>
                <span style="color:#441fff;">language </span>
                <span style="color:#1e1e1e;">= </span>
                <span style="color:#441fff;">"Java"</span>
                <span style="color:#1e1e1e;">;</span><br>

                <span style="color:#9f3f7f; margin-left: 25px;">private </span>
                <span style="color:#1e1e1e;">String </span>
                <span style="color:#441fff;">link </span>
                <span style="color:#1e1e1e;">= </span>
                <span style="color:#441fff;">"</span>
                <a href="github.com/Arik13/Viewer3D.git">Github</a>
                <span style="color:#441fff;">"</span>
                <span style="color:#1e1e1e;">;</span><br>

                <span style="color:#1e1e1e;">}</span><br>
                </div>
            </v-col>
        </v-row>
    </div>
</template>

<script>
export default {
    data: () => ({
        IDEs: ["Visual Studio", "VSCode", "QT Designer", "Netbeans"],
        webSkills: ["HTML5/CSS3/JS", "REST API's", "Express.js"],
        languages: ["JS/Node.js", "Java", "C/C++", "PHP", "Python"],
        dbSkills: ["MySQL", "MongoDB"],
        others: ["Git", "Bash", "OpenGL"],
        multiMediaSkills: [
            "Photoshop (Images)",
            "Logic Pro X (Digital Audio)",
            "Pro Tools 10 (Digital Audio)",
            "Adobe Premiere (Video)",
        ],
        courses: [
            {courseName: "Program Design", grade: "A"},
            {courseName: "Object Oriented Programming", grade: "A+"},
            {courseName: "Algorithms and Data Structures I", grade: "A"},
            {courseName: "Calculus I", grade: "A"},
            {courseName: "Calculus II", grade: "B-"},
            {courseName: "Linear Algebra", grade: "B"},
        ],
        udemyCourses: ["VueJS 2.0 - The Complete Guide", "Node JS 2.0 - The Complete Guide", "Machine Learning, Data Science and Deep Learning with Python"],
        books: [
            "Operating System Concepts 10th Edition",
            "Algorithms (by Robert Sedgewick)",
            "Boost.Asio C++ Network Programming",
            "Graph Theory (by Bondy, Murty)",
        ],

    })
}
</script>