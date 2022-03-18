import LinearProgress from '@mui/material/LinearProgress'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'

export default function ProgressBar({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <Grid
      container
      sx={{
        margin: '8rem auto',
        width: '80%',
        flexDirection: 'column',
        alignItems: 'center'
      }}
    >
      <Grid item>
        <LinearProgress />
        <Typography margin={1} variant="h5">
          {children}
        </Typography>
      </Grid>
    </Grid>
  )
}
