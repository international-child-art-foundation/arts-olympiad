import styles from "./about.module.css";
export default function aboutPage() {
  return (
    <div>
      <div className={styles.titleBlock} style={{ display: 'flex', alignItems: 'center', paddingLeft: '6vw' }}>
        <h1 className="mb-2 mt-0 text-3xl font-medium leading-6 indent-50 text-primary">About ICAF</h1>
      </div>
      <img src='/about/About.png' style={{ width: '100%', height: 'auto' }}></img>
      <div className={styles.contentBlock} style={{alignItems:'center'}}>
        <div className="bg-white rounded-2xl p-10 shadow-md flex mt-10" style={{ maxWidth: '60vw',margin:'auto',marginTop:'10vh'}}>
          <img src='/about/icon1.png' className={styles.imageBlock}></img>
          <div className="indent-10">
            <p className="text-left">Founded in 1997, the International Child Art Foundation (ICAF) serves American children as their national arts organization and the world's children as their global arts organization.</p>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-10 shadow-md flex mt-10" style={{ maxWidth: '60vw',margin: 'auto',marginTop:'5vh'}}>
          <img src='/about/icon2.png' className={styles.imageBlock}></img>
          <div className="indent-10">
            <p className="text-left">ICAF believes that children's art is arguably the most honest and pure form of human creative expression. Children worldwide produce original works of art for ICAF, and their masterpieces ICAF exhibits at prominent venues, including at The National Mall across the U.S. Capitol at the World Children's Festival, produced quadrennially by ICAF as the "Olympics" of children's imagination.</p>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-10 shadow-md flex mt-10" style={{ maxWidth: '60vw',margin: 'auto',marginTop:'5vh'}}>
          <img src='/about/icon3.png' className={styles.imageBlock}></img>
          <div className="indent-10">
            <p className="text-left">ICAF is grateful to the United States Olympic Committee for granting it an exclusive license to use the "Arts Olympiad" mark.</p>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-10 shadow-md flex mt-10" style={{ maxWidth: '60vw',margin: 'auto',marginTop:'5vh',marginBottom:'8vh'}}>
          <img src='/about/icon4.png' className={styles.imageBlock}></img>
          <div className="indent-10">
            <p className="text-left">To integrate Art and Sport with STEM disciplines, ICAF has pioneered STEAMS education for children's holistic development.</p>
          </div>
        </div>
        <div style={{ maxWidth: '60vw',margin: 'auto',marginTop:'5vh',marginBottom:'8vh'}}>
          <h1 className="text-2xl font-small leading-6 indent-50 text-primary">For more:</h1>
          <p>
            <a href="https://icaf.org/" className="text-primary" style={{display:'inline-flex',marginRight:'15vw',marginTop:'2vh'}}><u>International Child Art Foundation</u><img src='/about/link.png'></img></a>
            <a href="https://worldchildrensfestival.org/" className="text-primary" style={{display:'inline-flex'}}><u>The World Children's Festival</u><img src='/about/link.png'></img></a>
          </p>
        </div>
        {/* <ContentContainer>
          <img src='/about/icon1.png'></img>
        </ContentContainer> */}
      </div>
    </div>

  )
}