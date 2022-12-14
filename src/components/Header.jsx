import Logo from "../images/icons/pathfinding-logo.png"
import "./Header.css"
const Home_svg = <svg xmlns="http://www.w3.org/2000/svg" className="nav-icon" viewBox="0 0 50 50"><path d="M 25 1.0507812 C 24.7825 1.0507812 24.565859 1.1197656 24.380859 1.2597656 L 1.3808594 19.210938 C 0.95085938 19.550938 0.8709375 20.179141 1.2109375 20.619141 C 1.5509375 21.049141 2.1791406 21.129062 2.6191406 20.789062 L 4 19.710938 L 4 46 C 4 46.55 4.45 47 5 47 L 19 47 L 19 29 L 31 29 L 31 47 L 45 47 C 45.55 47 46 46.55 46 46 L 46 19.710938 L 47.380859 20.789062 C 47.570859 20.929063 47.78 21 48 21 C 48.3 21 48.589063 20.869141 48.789062 20.619141 C 49.129063 20.179141 49.049141 19.550938 48.619141 19.210938 L 25.619141 1.2597656 C 25.434141 1.1197656 25.2175 1.0507812 25 1.0507812 z M 35 5 L 35 6.0507812 L 41 10.730469 L 41 5 L 35 5 z" /></svg>
const Tutorial_svg = <svg xmlns="http://www.w3.org/2000/svg" className="nav-icon" viewBox="0 0 16.93 16.93" version="1.1"><path d="M8.51,0C3.83-.02.02,3.75+0,8.42c-.02,4.68+3.75,8.49+8.42,8.51+4.68.02+8.49-3.75+8.51-8.42C16.96,3.83+13.18.02+8.51,0Zm-.12,2.28c.41,0+.75.15+1.03.44.29.28.43.63.43,1.04+0+.41-.14.75-.43,1.04-.28.28-.63.42-1.03.42-.42,0-.76-.14-1.05-.42C7.06,4.52+6.91,4.17+6.91,3.76+6.91,3.34+7.06,3+7.35,2.72+7.63,2.43+7.98,2.28+8.39,2.28ZM6,6.07h3.89v7.25h1.17v.93H6V13.32H7.16V7H6Z" /></svg>
const Github_svg = <svg xmlns="http://www.w3.org/2000/svg" className="nav-icon" viewBox="0 0 32 32"><path d="M16 0.396c-8.839 0-16 7.167-16 16 0 7.073 4.584 13.068 10.937 15.183 0.803 0.151 1.093-0.344 1.093-0.772 0-0.38-0.009-1.385-0.015-2.719-4.453 0.964-5.391-2.151-5.391-2.151-0.729-1.844-1.781-2.339-1.781-2.339-1.448-0.989 0.115-0.968 0.115-0.968 1.604 0.109 2.448 1.645 2.448 1.645 1.427 2.448 3.744 1.74 4.661 1.328 0.14-1.031 0.557-1.74 1.011-2.135-3.552-0.401-7.287-1.776-7.287-7.907 0-1.751 0.62-3.177 1.645-4.297-0.177-0.401-0.719-2.031 0.141-4.235 0 0 1.339-0.427 4.4 1.641 1.281-0.355 2.641-0.532 4-0.541 1.36 0.009 2.719 0.187 4 0.541 3.043-2.068 4.381-1.641 4.381-1.641 0.859 2.204 0.317 3.833 0.161 4.235 1.015 1.12 1.635 2.547 1.635 4.297 0 6.145-3.74 7.5-7.296 7.891 0.556 0.479 1.077 1.464 1.077 2.959 0 2.14-0.020 3.864-0.020 4.385 0 0.416 0.28 0.916 1.104 0.755 6.4-2.093 10.979-8.093 10.979-15.156 0-8.833-7.161-16-16-16z" /></svg>


export default function Header({ changeModalState }) {
    return (
        <header>
            <nav className="navbar">
                <a href="https://fa74x.github.io/Pathfinding-Visualizer/" draggable="false"><img className="nav-logo" /*src={Logo}*/ /></a>
                <ul className="nav-items">
                    <li>
                        <a href="https://fa74x.github.io/Pathfinding-Visualizer/" draggable="false">
                            {Home_svg}
                            Home
                        </a>
                    </li>
                    <li>
                        <button className="openModalBtn" onClick={() => changeModalState(current => !current)}>
                            {Tutorial_svg}
                            Tutorial
                        </button>
                    </li>
                    <li>
                        <a href="https://github.com/FA74x" target="_blank" draggable="false">
                            {Github_svg}
                            GitHub
                        </a>
                    </li>
                </ul>
                <ul className="nav-items-mobile">
                    <li>
                        <button className="openModalBtn" onClick={() => changeModalState(current => !current)}>
                            {Tutorial_svg}
                        </button>
                    </li>
                    <li>
                        <a href="https://fa74x.github.io/Pathfinding-Visualizer/" draggable="false">
                            {Home_svg}
                        </a>
                    </li>
                    <li>
                        <a href="https://github.com/FA74x" target="_blank" draggable="false">
                            {Github_svg}
                        </a>
                    </li>
                </ul>
            </nav>
        </header >
    )
}