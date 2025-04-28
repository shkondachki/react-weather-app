import styles from "./SearchLocation.module.scss";
import searchIcon from "../../assets/search.svg"

interface SearchLocationProps {
    city: string;
    setCity: (city: string) => void;
    handleSearch: () => void;
    error: string;
}
export const SearchLocation = ({
   city = "Sofia",
   setCity,
   handleSearch,
   error
}: SearchLocationProps) => {

    return (
        <>
            <h1>Search for a city:</h1>
            <div className={styles.search}>
                <input
                    type="text"
                    placeholder="Enter city"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            handleSearch();
                        }
                    }}
                />
                <button onClick={handleSearch}>
                    <img src={searchIcon} alt="Search" />
                </button>
            </div>

            {error && <p className={styles.error}>{error}</p>}
        </>
    )
}