import React from "react";
import styles from "../../styles/BookingsCalendar.module.css";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

function BookingsCalendar() {
  return (
    <div className={styles.calendarCard}>
      <div className={styles.calendarHeader}>
        <button className={styles.navBtn}>
          <FaChevronLeft />
        </button>
        <h3>April 2024</h3>
        <button className={styles.navBtn}>
          <FaChevronRight />
        </button>
      </div>
      <div className={styles.calendar}>
        <div className={styles.weekdays}>
          <div>S</div>
          <div>M</div>
          <div>T</div>
          <div>W</div>
          <div>T</div>
          <div>F</div>
          <div>S</div>
        </div>
        <div className={styles.days}>
          <div className={styles.emptyDay}></div>
          <div className={styles.emptyDay}></div>
          <div>1</div>
          <div>2</div>
          <div>3</div>
          <div>4</div>
          <div>5</div>
          <div>6</div>
          <div>7</div>
          <div>8</div>
          <div>9</div>
          <div>10</div>
          <div>11</div>
          <div>12</div>
          <div>13</div>
          <div>14</div>
          <div>15</div>
          <div>16</div>
          <div>17</div>
          <div>18</div>
          <div>19</div>
          <div>20</div>
          <div>21</div>
          <div>22</div>
          <div>23</div>
          <div>24</div>
          <div>25</div>
          <div>26</div>
          <div>27</div>
          <div>28</div>
          <div>29</div>
          <div>30</div>
        </div>
      </div>
    </div>
  );
}

export default BookingsCalendar;
