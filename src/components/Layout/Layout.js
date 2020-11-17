import React from 'react';
import PropTypes from 'prop-types';
import styles from './Layout.module.css'



function Layout({children}){
    return(
        <section className={styles.container}>
            {children}
        </section>
    )
}

Layout.propTypes={
    children: PropTypes.arrayOf(PropTypes.object),
}
export default Layout;