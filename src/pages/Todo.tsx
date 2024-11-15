import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import {
  addTask,
  updateTaskStatus,
  removeTask,
  editTaskName,
} from '../store/slices/appSlice';
import styles from './Pages.module.css';

interface ModalProps {
  onClose: () => void;
  onConfirm: () => void;
  taskName: string;
}

export function Todo() {
  const tasks = useSelector((state: RootState) => state.app.tasks);
  const lang = useSelector((state: RootState) => state.app.lang);
  const dispatch = useDispatch();
  const [taskName, setTaskName] = useState('');
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
  const [editedName, setEditedName] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState<string | null>(null);

  const labels = {
    addTask: lang === 'ru' ? 'Добавить задачу' : 'Add Task',
    delete: lang === 'ru' ? 'Удалить' : 'Delete',
    edit: '🖊',
    save: lang === 'ru' ? 'Сохранить' : 'Save',
  };

  const handleAddTask = () => {
    if (taskName.trim()) {
      dispatch(addTask({ name: taskName }));
      setTaskName('');
    }
  };

  const handleStatusChange = (
    id: string,
    currentStatus: 'none' | 'completed' | 'not_completed'
  ) => {
    const nextStatus =
      currentStatus === 'none'
        ? 'completed'
        : currentStatus === 'completed'
        ? 'not_completed'
        : 'none';
    dispatch(updateTaskStatus({ id, status: nextStatus }));
  };

  const handleDeleteTask = (id: string) => {
    setTaskToDelete(id);
    setIsModalOpen(true);
  };

  const handleConfirm = () => {
    if (taskToDelete) {
      dispatch(removeTask({ id: taskToDelete }));
      setTaskToDelete(null);
    }
  };

  const handleEditTask = (id: string) => {
    setEditingTaskId(id);
    const task = tasks.find((task) => task.id === id);
    if (task) {
      setEditedName(task.name);
    }
  };

  const handleSaveEdit = (id: string) => {
    if (editedName.trim()) {
      dispatch(editTaskName({ id, name: editedName }));
      setEditingTaskId(null);
    }
  };

  const Modal = ({ onClose, onConfirm, taskName }: ModalProps) => (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 5000,
      }}
    >
      <div
        style={{
          backgroundColor: '#ed3939be',
          padding: '20px',
          borderRadius: '5px',
          textAlign: 'center',
          width: '300px',
        }}
      >
        <h3>Вы уверены, что хотите удалить задачу "{taskName}"?</h3>
        <div style={{ marginTop: '20px' }}>
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            style={{
              padding: '10px 15px',
              backgroundColor: 'red',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              marginRight: '10px',
            }}
          >
            Да
          </button>
          <button
            onClick={onClose}
            style={{
              padding: '10px 15px',
              backgroundColor: 'gray',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
            }}
          >
            Нет
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <h1 style={{ fontSize: '40px', width: '50%', margin: '180px auto 50px' }}>
        T
        <span
          className={styles.redLetter}
          style={{
            fontSize: '40px',
            color: 'red',
          }}
        >
          o
        </span>
        -D
        <span
          className={styles.redLetter}
          style={{
            fontSize: '40px',
            color: 'red',
          }}
        >
          o
        </span>
      </h1>

      <div
        style={{ maxWidth: '600px', margin: '20px auto', textAlign: 'center' }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <input
            type="text"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            placeholder={
              lang === 'ru' ? 'Введите название задачи' : 'Enter task name'
            }
            style={{
              display: 'inline-block',
              padding: '10px',
              fontSize: '16px',
              width: '70%',
            }}
          />
          <button
            onClick={handleAddTask}
            style={{
              display: 'inline-block',
              width: '30%',
              minWidth: '90px',
              padding: '10px',
              fontSize: '16px',
              border: 'none',
            }}
          >
            {labels.addTask}
          </button>
        </div>
        <ul
          style={{
            marginTop: '20px',
            listStyle: 'none',
            padding: 0,
            maxWidth: '600px',
          }}
        >
          {tasks.map((task) => (
            <li
              key={task.id}
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '10px',
                borderRadius: '5px',
              }}
            >
              {editingTaskId === task.id ? (
                <input
                  type="text"
                  value={editedName}
                  onChange={(e) => setEditedName(e.target.value)}
                  style={{
                    fontSize: '16px',
                    padding: '5px',
                    width: '100%',
                    marginRight: '25px',
                  }}
                />
              ) : (
                <span style={{ fontSize: '16px', marginRight: '25px' }}>
                  {task.name}
                </span>
              )}
              <div style={{ display: 'flex', gap: '10px' }}>
                {editingTaskId === task.id ? (
                  <button
                    onClick={() => handleSaveEdit(task.id)}
                    style={{
                      padding: '5px 10px',
                      fontSize: '14px',
                      backgroundColor: 'green',
                      border: 'none',
                      borderRadius: '5px',
                    }}
                  >
                    {labels.save}
                  </button>
                ) : (
                  <>
                    <button
                      onClick={() => handleStatusChange(task.id, task.status)}
                      style={{
                        padding: '5px 10px',
                        fontSize: '14px',
                        border: '1px solid #ccc',
                        borderRadius: '4px',
                        backgroundColor:
                          task.status === 'none'
                            ? '#fafafa'
                            : task.status === 'completed'
                            ? 'green'
                            : 'red',
                      }}
                    >
                      {task.status === 'none' && '❑'}
                      {task.status === 'completed' && '✔'}
                      {task.status === 'not_completed' && '✖'}
                    </button>
                    <button
                      onClick={() => handleEditTask(task.id)}
                      style={{
                        padding: '5px 10px',
                        fontSize: '14px',
                        backgroundColor: 'orange',
                        border: 'none',
                        borderRadius: '5px',
                      }}
                    >
                      {labels.edit}
                    </button>
                    <button
                      onClick={() => handleDeleteTask(task.id)}
                      style={{
                        padding: '5px 10px',
                        fontSize: '14px',
                        backgroundColor: 'red',
                        border: 'none',
                        borderRadius: '5px',
                      }}
                    >
                      {labels.delete}
                    </button>
                  </>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>

      {isModalOpen && (
        <Modal
          onClose={() => setIsModalOpen(false)}
          onConfirm={handleConfirm}
          taskName={tasks.find((task) => task.id === taskToDelete)?.name || ''}
        />
      )}
    </>
  );
}
