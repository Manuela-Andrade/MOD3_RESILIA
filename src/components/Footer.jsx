import React from 'react'
import '../styles/footer.css'

function Footer() {
    return (
        <footer>
            <div className='border1 p-3'>
                <p className='mt-2 icones'>
                    <a href="https://pt-br.facebook.com/" className='font logoF'><i className="text-center mt-2 fa fa-facebook-f"></i></a>
                    <a href="https://www.instagram.com/" className='font logoI'><i className="fa fa-instagram"></i></a>
                    <a href="https://mail.google.com/" className='font logoG'><i className="fa fa-envelope"></i></a>
                    <a href="https://web.whatsapp.com/" className='font logoW'><i className="fa fa-whatsapp"></i></a>
                </p>
                <p className='color_footer text-center font'>© 2023 Escola Resilia</p>
            </div>
        </footer>
    )
}

export default Footer