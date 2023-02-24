// const themebtncolor = localStorage.getItem('themebtncolor')
// let colorval=''

// themebtbcolor==='success'?colorval='green':colorval=''

const customStyles = {
    title: {
        style: {
            color: 'red',
            fontWeight: '900',
        }
    },
    rows: {
        style: {
            minHeight: '40px'
        }
    },
    headCells: {
        style: {
            fontSize: '14px',
            // background: colorval,
            background: 'rgb(105,59,233)',
            // background: 'rgb(157, 153, 219)',
            color: 'white',
        },
    },
    cells: {
        style: {
            fontSize: '14px',
            fontWeight:'600',
            // background: 'rgb(242,242,242)',
            // borderBottom: "1px solid silver"
        },
    },
};

export default customStyles;