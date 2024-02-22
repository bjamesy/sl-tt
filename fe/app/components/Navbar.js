import Link from 'next/link'

const Navbar = ()=> {
    return (
        <nav>
            <ul>
            <li><Link href="/">Home</Link></li> 
            <li><Link href="/students">Add New Student</Link></li>
            <li><Link href="/students">Students List</Link></li>
            <li><Link href="/courses">Add New Courses</Link></li>
            <li><Link href="/courses">Courses List</Link></li>
            <li><Link href="/results">Add New Results</Link></li>
            <li><Link href="/results">Results List</Link></li>
            </ul>
        </nav>
    )
}

export default Navbar