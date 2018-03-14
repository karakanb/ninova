import Database from '../Database.js';

export default class {
  /**
   * Construct the sync instance.
   * @param {Database} db 
   */
  constructor(db) {
    this.db = db;
  }

  /**
   * Sync the given rows with the existing ones.
   * @param {Object[]} updatedRows 
  */
  sync(updatedRows) {
    this.db.getAll((allRows) => {
      this.__syncGiven(allRows, updatedRows);
    });
  }

  /**
   * 
   * @param {Object[]} existingRows 
   * @param {Object[]} updatedRows 
   */
  __syncGiven(existingRows, updatedRows) {
    for (const row of updatedRows) {
      if (!existingRows.hasOwnProperty(updatedRows.assignmentLink)) {
        this.db.set(row.assignmentLink, row);
      }
    }
  }
}