function CharacterCard({ charData }) {
    return (
    <div className= {`card ${charData.isFound ? 'has-background-success' : ``} mb-4`}>
        <div className="card-content p-2">
          <div className="media">
            <div className="media-left">
              <figure className="image is-64x64">
                <img src={charData.img} alt="" />
              </figure>
            </div>
            <div className="media-content">
              <p className="title is-5">{charData.name} {charData.isFound ? '✔️' : '🔍'}  </p>
              <p className="subtitle is-6">{charData.origin}</p>
            </div>
          </div>
        </div>
    </div>
    )
}

export default CharacterCard