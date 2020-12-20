export default {
    palette: {
      primary: {
        light: '#33c9dc',
        main: '#00bcd4',
        dark: '#008394',
        contrastText: '#fff',
      },
      secondary: {
        light: '#ff6333',
        main: '#ff3d00',
        dark: '#b22a00',
        contrastText: '#fff',
      }
    },
    spreadThis:{
      typography:{
        useNextVariants: true
      },
      img:{
        margin: 'auto',
        display: 'block',
        width: 'auto',
        height:150
      },
      banner:{
          height: 667,
          backgroundImage:"url(https://firebasestorage.googleapis.com/v0/b/social-network-576fc.appspot.com/o/86208176540.jpg?alt=media)",
          backgroundSize: "1366px auto",
      },
      card:{
          marginTop:"20%",
          marginRight:"20%",
          textAlign:'center'
      },
      TextField:{
        paddingBottom: 20 
      },
      button:{
          marginTop:20
      },
      customError:{
          color : 'red',
          fontSize: '0.8rem',
      },
      progress:{
          position: 'absolute'
      },
      invisibleSeparator:{
        border:'none',
        margin: 4
      },
      visibleSeparator:{
        width:'100%',
        borderBottom:'1px solid rgba(0,0,0,0.1)',
        marginBottom: 20
      },
      profile: {
        '& .image-wrapper': {
          textAlign: 'center',
          position: 'relative',
          '& button': {
            position: 'absolute',
            top: '80%',
            left: '70%'
          }
        },
        '& .profile-image': {
          width: 200,
          height: 200,
          objectFit: 'cover',
          maxWidth: '100%',
          borderRadius: '50%'
        },
        '& .profile-details': {
          textAlign: 'center',
          '& span, svg': {
            verticalAlign: 'middle'
          },
          '& a': {
            color: '#00bcd4'
          }
        },
        '& hr': {
          border: 'none',
          margin: '0 0 10px 0'
        },
        '& svg.button': {
          '&:hover': {
            cursor: 'pointer'
          }
        }
      }
    }  
  }